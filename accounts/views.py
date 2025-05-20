import os
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import Group
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.urls import reverse
import uuid
from .models import Client, PendingProfile, Personne, Pharmacie, Medecin, Livreur
from .forms import (
    ClientRegistrationForm, 
    LivreurRegistrationForm, 
    PharmacieRegistrationForm, 
    MedecinRegistrationForm,
    EmailAuthForm
)
from django.contrib.auth.views import LoginView
import shutil
from django.core.files import File
import requests
import time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Pharmacie
from .serializers import ClientSerializer, LivreurSerializer, MedecinSerializer, PharmacieSerializer

class ClientListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

class MedecinListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        medecins = Medecin.objects.all()
        serializer = MedecinSerializer(medecins, many=True)
        return Response(serializer.data)

class LivreurListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        livreurs = Livreur.objects.all()
        serializer = LivreurSerializer(livreurs, many=True)
        return Response(serializer.data)
    
class PharmacieListAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Nécessite une authentification

    def get(self, request):
        pharmacies = Pharmacie.objects.all()
        serializer = PharmacieSerializer(pharmacies, many=True)
        return Response(serializer.data)

class CustomLoginView(LoginView):
    form_class = EmailAuthForm
    template_name = 'login.html'

    def form_valid(self, form):
        user = form.get_user()
        if hasattr(user, 'personne') and user.personne.role == 'client' and not user.personne.is_verified:
            messages.error(self.request, "Veuillez vérifier votre email avant de vous connecter.")
            return redirect('login')
        return super().form_valid(form)

@login_required
def home(request):
    if not hasattr(request.user, 'personne'):
        return redirect('accounts:register')
    
    role = request.user.personne.role
    if role == 'pharmacie':
        return redirect('accounts:pharmacie_dashboard')
    elif role == 'client':
        return redirect('accounts:nearby_pharmacies')  # Redirect to search page
    elif role == 'medecin':
        return redirect('accounts:login')  # Assuming a doctor dashboard
    elif role == 'livreur':
        return redirect('accounts:login')  # Assuming a deliverer dashboard
    if request.user.is_staff or role == 'is_admin':
        return redirect('accounts:verify_profiles')
    return redirect('accounts:login')

def send_registration_email(user, request):
    subject = 'Bienvenue sur notre plateforme !'
    message = render_to_string('registration_email.html', {
        'user': user,
        'domain': request.get_host(),
        'protocol': 'https' if request.is_secure() else 'http',
    })
    plain_message = strip_tags(message)
    try:
        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            html_message=message,
            fail_silently=False
        )
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email de confirmation : {e}")
        messages.error(request, "Inscription réussie, mais l'email de confirmation n'a pas pu être envoyé.")

def register(request):
    if request.method == 'POST':
        role = request.POST.get('role', 'client').lower()
    else:
        role = request.GET.get('role', 'client').lower()

    form_classes = {
        'pharmacie': PharmacieRegistrationForm,
        'medecin': MedecinRegistrationForm,
        'client': ClientRegistrationForm
    }

    if role not in form_classes and role != 'livreur':
        messages.error(request, "Rôle non reconnu.")
        return redirect('accounts:register')

    if role == 'livreur':
        return redirect('accounts:register_livreur')

    form_class = form_classes[role]

    if request.method == 'POST':
        form = form_class(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            personne = user.personne
            if role == 'client':
                send_registration_email(user, request)
            messages.success(request, "Inscription réussie. Veuillez vérifier votre email." if role == 'client' else "Votre compte est en attente de vérification.")
            return redirect('accounts:login')
        else:
            messages.error(request, "Veuillez corriger les erreurs.")
    else:
        form = form_class()

    return render(request, 'register.html', {'form': form, 'role': role})

def register_livreur(request):
    token_str = request.GET.get('token')
    if not token_str:
        return HttpResponseBadRequest("Lien d'invitation manquant.")

    try:
        token = uuid.UUID(token_str)
    except ValueError:
        return HttpResponseBadRequest("Lien d'invitation invalide (UUID incorrect).")

    try:
        pharmacie = Pharmacie.objects.get(invitation_token=token)
    except Pharmacie.DoesNotExist:
        return HttpResponse("Lien d'invitation invalide (aucune pharmacie ne correspond).", status=400)

    if request.method == 'POST':
        form = LivreurRegistrationForm(request.POST, request.FILES, pharmacie=pharmacie)
        if form.is_valid():
            user = form.save()
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)
            send_registration_email(user, request)
            messages.success(request, "Inscription réussie. Bienvenue !")
            return redirect('accounts:login')
    else:
        form = LivreurRegistrationForm(initial={'invitation_token': token_str}, pharmacie=pharmacie)

    return render(request, 'register_deliverer.html', {'form': form})

@login_required
def pharmacie_dashboard(request):
    if not hasattr(request.user, 'personne') or request.user.personne.role != 'pharmacie':
        return HttpResponseForbidden("Accès réservé aux pharmacies.")

    personne = request.user.personne
    pharmacie = Pharmacie.objects.get(personne=personne)

    if 'regenerate_token' in request.POST:
        pharmacie.invitation_token = uuid.uuid4()
        pharmacie.save()
        messages.success(request, "Lien d'invitation régénéré avec succès.")

    # Generate invitation link for livreurs
    invitation_link = request.build_absolute_uri(
        reverse('accounts:register_livreur') + f'?token={pharmacie.invitation_token}'
    )

    return render(request, 'pharmacy_dashboard.html', {
        'invitation_link': invitation_link,
        'pharmacie': pharmacie
    })

def is_admin(user):
    return user.is_staff

@user_passes_test(is_admin)
def verify_profiles(request):
    pending_profiles = Personne.objects.filter(is_verified=False, role__in=['pharmacie', 'medecin'])
    profiles_with_data = []
    for personne in pending_profiles:
        try:
            pending_profile = personne.pending_profile
            pending_data = pending_profile.data.copy()  # Créer une copie pour modifier
            # Ajouter les URLs complètes pour les fichiers
            for field in ['agrement', 'cachet', 'signature', 'registre_commerce']:
                if pending_data.get(field):
                    pending_data[field] = {
                        'path': pending_data[field],
                        'url': f"{settings.MEDIA_URL}{pending_data[field]}"
                    }
            profiles_with_data.append({
                'personne': personne,
                'pending_data': pending_data,
                'role': personne.role
            })
        except PendingProfile.DoesNotExist:
            profiles_with_data.append({
                'personne': personne,
                'pending_data': None,
                'role': personne.role
            })
    return render(request, 'verify_profiles.html', {'profiles': profiles_with_data})

@user_passes_test(is_admin)
def approve_profile(request, personne_id, role):
    personne = get_object_or_404(Personne, id=personne_id)
    try:
        pending_profile = personne.pending_profile
        pending_data = pending_profile.data
    except PendingProfile.DoesNotExist:
        pending_data = {}

    personne.is_verified = True
    personne.save()

    if role == 'medecin':
        medecin = Medecin.objects.create(
            personne=personne,
            specialite_medicale=pending_data.get('specialite_medicale', ''),
            addresse=pending_data.get('addresse', ''),
        )
        for field in ['agrement', 'cachet', 'signature']:
            file_path = pending_data.get(field)
            if file_path:
                source_path = os.path.join(settings.MEDIA_ROOT, file_path)
                if os.path.exists(source_path):
                    filename = os.path.basename(file_path)
                    target_path = os.path.join('doctor_docs' if field == 'agrement' else 'doctor_stamps' if field == 'cachet' else 'doctor_signatures', filename)
                    target_full_path = os.path.join(settings.MEDIA_ROOT, target_path)
                    os.makedirs(os.path.dirname(target_full_path), exist_ok=True)
                    shutil.copy(source_path, target_full_path)
                    setattr(medecin, field, target_path)
        medecin.save()

    elif role == 'pharmacie':
        latitude = pending_data.get('latitude', 0.0)
        longitude = pending_data.get('longitude', 0.0)
        localisation = f"{latitude},{longitude}"
        pharmacie = Pharmacie.objects.create(
            personne=personne,
            nom_pharmacie=pending_data.get('nom_pharmacie', ''),
            nom_proprietaire=pending_data.get('nom_proprietaire', ''),
            localisation=localisation,
            heure_ouverture=pending_data.get('heure_ouverture', '00:00:00'),
            heure_fermeture=pending_data.get('heure_fermeture', '00:00:00'),
            offre_livraison=pending_data.get('offre_livraison', False),
            lien_reseau_sociaux=pending_data.get('lien_reseau_sociaux', '')
        )
    # Copier le fichier registre_commerce
        registre_path = pending_data.get('registre_commerce')
        if registre_path:
            source_path = os.path.join(settings.MEDIA_ROOT, registre_path)
            if os.path.exists(source_path):
                filename = os.path.basename(registre_path)
                target_path = os.path.join('pharmacy_docs', filename)
                target_full_path = os.path.join(settings.MEDIA_ROOT, target_path)
                os.makedirs(os.path.dirname(target_full_path), exist_ok=True)
                shutil.copy(source_path, target_full_path)
                pharmacie.registre_commerce = target_path
                pharmacie.save()

    group_map = {
        'pharmacie': 'Pharmacies',
        'medecin': 'Médecins',
    }
    group, _ = Group.objects.get_or_create(name=group_map[role])
    personne.user.groups.add(group)

    if 'pending_profile' in locals():
        pending_profile.delete()

    send_approval_email(personne.user, request)
    return redirect('accounts:verify_profiles')

def send_approval_email(user, request):
    subject = 'Votre compte a été approuvé'
    login_url = request.build_absolute_uri(reverse('accounts:login'))
    html_message = render_to_string('approval_email.html', {'user': user, 'login_url': login_url})
    plain_message = strip_tags(html_message)
    send_mail(
        subject,
        plain_message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=html_message,
        fail_silently=False
    )

@user_passes_test(is_admin)
def reject_profile(request, personne_id):
    personne = get_object_or_404(Personne, id=personne_id)
    user = personne.user
    # Supprimer les fichiers associés dans PendingProfile
    try:
        pending_profile = personne.pending_profile
        for field in ['agrement', 'cachet', 'signature', 'registre_commerce']:
            file_path = pending_profile.data.get(field)
            if file_path:
                full_path = os.path.join(settings.MEDIA_ROOT, file_path)
                if os.path.exists(full_path):
                    os.remove(full_path)
        pending_profile.delete()
    except PendingProfile.DoesNotExist:
        pass

    # Envoyer l'email de rejet
    try:
        subject = 'Votre inscription a été refusée'
        message = render_to_string('rejection_email.html', {'user': user})
        plain_message = strip_tags(message)
        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            html_message=message,
            fail_silently=False
        )
    except Exception as e:
        print(f"Erreur lors de l'envoi de l'email de rejet : {e}")
        messages.error(request, "Profil rejeté, mais l'email de notification n'a pas pu être envoyé.")

    user.delete()
    return redirect('accounts:verify_profiles')



def geocode_address(address):
    url = f"https://nominatim.openstreetmap.org/search?q={address}&format=json&limit=1"
    headers = {'User-Agent': 'PharmacyLocator/1.0 (sirinesaad98@gmail.com)'}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        if data:
            return float(data[0]['lat']), float(data[0]['lon'])
        return None, None
    except requests.RequestException as e:
        print(f"Erreur lors de la géocodification de l'adresse {address} : {e}")
        return None, None


@login_required
def nearby_pharmacies(request):
    pharmacies = Pharmacie.objects.all()
    for pharmacy in pharmacies:
        if pharmacy.latitude is None or pharmacy.longitude is None:
            print(f"Géocodification de l'adresse : {pharmacy.localisation}")
            lat, lon = geocode_address(pharmacy.localisation)
            if lat and lon:
                pharmacy.latitude = lat
                pharmacy.longitude = lon
                pharmacy.save()
                print(f"Coordonnées mises à jour pour {pharmacy.nom_pharmacie} : {lat}, {lon}")
            else:
                print(f"Échec de la géocodification pour {pharmacy.nom_pharmacie}")
            time.sleep(1)  # Respecter les limites de Nominatim
    return render(request, 'nearby_pharmacies.html', {'pharmacies': pharmacies})

@login_required
def pharmacy_profile(request, pharmacy_id):
    pharmacie = get_object_or_404(Pharmacie, personne__id=pharmacy_id)
    print(f"Chargement du profil de la pharmacie : {pharmacie.nom_pharmacie}")
    return render(request, 'pharmacy_profile.html', {'pharmacie': pharmacie})