from django.http import HttpResponse, HttpResponseForbidden
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import Group
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.urls import reverse
from .models import Client, Personne, Pharmacie, Medecin, Livreur
from .forms import (
    ClientRegistrationForm, 
    LivreurRegistrationForm, 
    PharmacieRegistrationForm, 
    MedecinRegistrationForm,
    EmailAuthForm
)
from django.contrib.auth.views import LoginView

class CustomLoginView(LoginView):
    form_class = EmailAuthForm
    template_name = 'login.html'

@login_required
def home(request):
    if not hasattr(request.user, 'personne'):
        return redirect('register')
    
    role = request.user.personne.role
    if role == 'pharmacie':
        return redirect('pharmacie_dashboard')
    elif role == 'client':
        return redirect('login')
    elif role == 'medecin':
        return redirect('login')
    elif role == 'livreur':
        return redirect('login')
    return redirect('login')

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
        return redirect('register')

    if role == 'livreur':
        return redirect('register_livreur')

    form_class = form_classes[role]

    if request.method == 'POST':
        form = form_class(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            
            if role in ['pharmacie', 'medecin']:
                messages.info(request, "Votre compte est en attente de vérification.")
                return redirect('login')
            else:
                user.backend = 'django.contrib.auth.backends.ModelBackend'
                login(request, user)
                return redirect('home')
        else:
            messages.error(request, "Veuillez corriger les erreurs.")
    else:
        form = form_class()

    return render(request, 'register.html', {'form': form, 'role': role})

from django.http import HttpResponse, HttpResponseBadRequest
import uuid

def register_livreur(request):
    token_str = request.GET.get('token')

    if not token_str:
        return HttpResponseBadRequest("Lien d'invitation manquant.")

    try:
        token = uuid.UUID(token_str)
    except ValueError:
        return HttpResponseBadRequest("Lien d'invitation invalide (UUID incorrect).")

    try:
        pharmacie = Pharmacie.objects.get(personne__invitation_token=token)
    except Pharmacie.DoesNotExist:
        return HttpResponse("Lien d'invitation invalide (aucune pharmacie ne correspond).", status=400)

    if request.method == 'POST':
        form = LivreurRegistrationForm(request.POST, request.FILES, pharmacie=pharmacie)
        if form.is_valid():
            user = form.save()
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)
            return redirect('home')
    else:
        form = LivreurRegistrationForm(initial={'invitation_token': token_str}, pharmacie=pharmacie)

    return render(request, 'register_deliverer.html', {'form': form})

from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.urls import reverse
from django.shortcuts import render
import uuid

@login_required
def pharmacie_dashboard(request):
    if not hasattr(request.user, 'personne') or request.user.personne.role != 'pharmacie':
        return HttpResponseForbidden("Accès réservé aux pharmacies.")

    personne = request.user.personne

    # Vérifie ou génère le token d'invitation
    if not personne.invitation_token:
        personne.invitation_token = uuid.uuid4()
        personne.save()

    pharmacie = Pharmacie.objects.get(personne=personne)

    # Génère l'URL d'invitation complète
    invitation_link = request.build_absolute_uri(
        reverse('register_livreur') + f'?token={personne.invitation_token}'
    )

    return render(request, 'pharmacy_dashboard.html', {
        'invitation_link': invitation_link,
        'pharmacie': pharmacie
    })


def is_admin(user):
    return user.is_staff

@user_passes_test(is_admin)
def verify_profiles(request):
    pending_profiles = Personne.objects.filter(is_verified=False).exclude(role=None)
    return render(request, 'verify_profiles.html', {'profiles': pending_profiles})

@user_passes_test(is_admin)
def approve_profile(request, personne_id, role):
    personne = get_object_or_404(Personne, id=personne_id)
    personne.role = role
    personne.is_verified = True
    personne.save()

    if role == 'medecin':
        Medecin.objects.create(
            personne=personne,
            specialite_medicale=personne.specialite_medicale,
            agrement=personne.agrement,
            addresse=personne.addresse,
            cachet=personne.cachet,
            signature=personne.signature
        )
    elif role == 'pharmacie':
        Pharmacie.objects.create(
            personne=personne,
            nom_pharmacie=personne.nom_pharmacie,
            nom_proprietaire=personne.nom_proprietaire,
            registre_commerce=personne.registre_commerce,
            localisation=personne.localisation,
            heure_ouverture=personne.heure_ouverture,
            heure_fermeture=personne.heure_fermeture,
            offre_livraison=personne.offre_livraison,
            lien_reseau_sociaux=personne.lien_reseau_sociaux
        )
    elif role == 'client':
        Client.objects.create(personne=personne)

    group_map = {
        'client': 'Clients',
        'pharmacie': 'Pharmacies',
        'medecin': 'Médecins',
        'livreur': 'Livreurs'
    }
    group, _ = Group.objects.get_or_create(name=group_map[role])
    personne.user.groups.add(group)
    
    send_approval_email(personne.user, request)
    return redirect('verify_profiles')

def send_approval_email(user, request):
    subject = 'Votre compte a été approuvé'
    login_url = f"{request.scheme}://{request.get_host()}/login/"
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
    
    user.delete()
    return redirect('verify_profiles')