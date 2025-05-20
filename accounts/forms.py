# accounts/forms.py
import uuid
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User, Group
from .models import Client, PendingProfile, Personne, Pharmacie, Medecin, Livreur
from django.core.files.storage import FileSystemStorage
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable
from django.utils.text import slugify
import os

class EmailAuthForm(AuthenticationForm):
    username = forms.EmailField(label='Email')

class BaseRegistrationForm(UserCreationForm):
    nom = forms.CharField(required=True)
    prenom = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    num_tel = forms.CharField(required=True)
    date_naissance = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), required=True)
    wilaya = forms.CharField(required=True)
    commune = forms.CharField(required=True)
    sexe = forms.ChoiceField(choices=Personne.SEXE_CHOICES, required=True)

    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Cet email est déjà utilisé.")
        return email

    def generate_username(self):
        base = self.cleaned_data.get('prenom', 'user').lower()
        unique_username = f"{base}_{uuid.uuid4().hex[:6]}"
        while User.objects.filter(username=unique_username).exists():
            unique_username = f"{base}_{uuid.uuid4().hex[:6]}"
        return unique_username

class ClientRegistrationForm(BaseRegistrationForm):
    photo_de_profile = forms.ImageField(required=True)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.username = self.generate_username()
        if commit:
            user.save()  # This triggers the signal to create a Personne instance
            personne = user.personne  # Récupérer la Personne existante
            personne.nom = self.cleaned_data['nom']
            personne.prenom = self.cleaned_data['prenom']
            personne.email = self.cleaned_data['email']
            personne.num_tel = self.cleaned_data['num_tel']
            personne.date_naissance = self.cleaned_data['date_naissance']
            personne.wilaya = self.cleaned_data['wilaya']
            personne.commune = self.cleaned_data['commune']
            personne.sexe = self.cleaned_data['sexe']
            personne.role = 'client'
            personne.is_verified = True
            personne.save()
            Client.objects.create(
                personne=personne,
                photo_de_profile=self.cleaned_data['photo_de_profile']
            )
        return user

class PharmacieRegistrationForm(BaseRegistrationForm):
    nom_pharmacie = forms.CharField(required=True)
    nom_proprietaire = forms.CharField(required=True)
    registre_commerce = forms.FileField(required=True)
    localisation = forms.CharField(required=True)
    heure_ouverture = forms.TimeField(widget=forms.TimeInput(attrs={'type': 'time'}), required=True)
    heure_fermeture = forms.TimeField(widget=forms.TimeInput(attrs={'type': 'time'}), required=True)
    offre_livraison = forms.BooleanField(required=False)
    lien_reseau_sociaux = forms.URLField(required=False)
    def get_coordinates(self, address):
        try:
            # Initialiser le géocodeur Nominatim
            geolocator = Nominatim(user_agent="pfe_pharmacie_app")
            # Obtenir les coordonnées de l'adresse
            location = geolocator.geocode(address, timeout=10)
            if location:
                return location.latitude, location.longitude
            else:
                # Si l'adresse n'est pas trouvée, retourner des coordonnées par défaut
                return 0.0, 0.0
        except (GeocoderTimedOut, GeocoderUnavailable) as e:
            # En cas d'erreur (timeout, problème de connexion, etc.), retourner des coordonnées par défaut
            print(f"Erreur de géocodage pour l'adresse {address} : {e}")
            return 0.0, 0.0
        
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.username = self.generate_username()
        if commit:
            user.save()
            # Obtenir les coordonnées GPS de l'adresse
            latitude, longitude = self.get_coordinates(self.cleaned_data['localisation'])
            personne = user.personne  # Récupérer la Personne existante
            personne.nom = self.cleaned_data['nom']
            personne.prenom = self.cleaned_data['prenom']
            personne.email = self.cleaned_data['email']
            personne.num_tel = self.cleaned_data['num_tel']
            personne.date_naissance = self.cleaned_data['date_naissance']
            personne.wilaya = self.cleaned_data['wilaya']
            personne.commune = self.cleaned_data['commune']
            personne.sexe = self.cleaned_data['sexe']
            personne.role = 'pharmacie'
            personne.is_verified = False
            personne.save()
            # Sauvegarder le fichier registre_commerce
            fs = FileSystemStorage()
            original_filename = self.cleaned_data['registre_commerce'].name
            filename, ext = os.path.splitext(original_filename)
            cleaned_filename = f"{slugify(filename)}{ext}"  # Ex: "Série TP.pdf" -> "serie-tp.pdf"
            registre_commerce_path = fs.save(
                f"pending/pharmacie/registre/{cleaned_filename}",
                self.cleaned_data['registre_commerce']
            )
            # Stocker les données spécifiques dans PendingProfile
            pending_data = {
                'nom_pharmacie': self.cleaned_data['nom_pharmacie'],
                'nom_proprietaire': self.cleaned_data['nom_proprietaire'],
                'registre_commerce': registre_commerce_path,
                'latitude': latitude,
                'longitude': longitude,
                'heure_ouverture': self.cleaned_data['heure_ouverture'].strftime('%H:%M:%S'),
                'heure_fermeture': self.cleaned_data['heure_fermeture'].strftime('%H:%M:%S'),
                'offre_livraison': self.cleaned_data.get('offre_livraison', False),
                'lien_reseau_sociaux': self.cleaned_data.get('lien_reseau_sociaux', '')
            }
            PendingProfile.objects.create(
                personne=personne,
                role='pharmacie',
                data=pending_data
            )
        return user

class MedecinRegistrationForm(BaseRegistrationForm):
    specialite_medicale = forms.CharField(required=True)
    agrement = forms.FileField(required=True)
    addresse = forms.CharField(required=True)
    cachet = forms.ImageField(required=False)
    signature = forms.ImageField(required=False)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.username = self.generate_username()
        if commit:
            user.save()  # This triggers the signal to create a Personne instance
            # Récupérer la Personne existante au lieu de créer une nouvelle
            personne = user.personne  # Utilise la relation OneToOne (related_name='personne')
            personne.nom = self.cleaned_data['nom']
            personne.prenom = self.cleaned_data['prenom']
            personne.email = self.cleaned_data['email']
            personne.num_tel = self.cleaned_data['num_tel']
            personne.date_naissance = self.cleaned_data['date_naissance']
            personne.wilaya = self.cleaned_data['wilaya']
            personne.commune = self.cleaned_data['commune']
            personne.sexe = self.cleaned_data['sexe']
            personne.role = 'medecin'
            personne.is_verified = False
            personne.save()
            # Sauvegarder les fichiers et obtenir leurs chemins
            fs = FileSystemStorage()
            pending_data = {
                'specialite_medicale': self.cleaned_data['specialite_medicale'],
                'addresse': self.cleaned_data['addresse'],
                'agrement': None,
                'cachet': None,
                'signature': None,
            }

            # Sauvegarder chaque fichier et stocker son chemin
            if self.cleaned_data['agrement']:
                agrement_path = fs.save(f"pending/medecin/agrement/{self.cleaned_data['agrement'].name}", self.cleaned_data['agrement'])
                pending_data['agrement'] = agrement_path

            if self.cleaned_data['cachet']:
                cachet_path = fs.save(f"pending/medecin/cachet/{self.cleaned_data['cachet'].name}", self.cleaned_data['cachet'])
                pending_data['cachet'] = cachet_path

            if self.cleaned_data['signature']:
                signature_path = fs.save(f"pending/medecin/signature/{self.cleaned_data['signature'].name}", self.cleaned_data['signature'])
                pending_data['signature'] = signature_path

            # Stocker les données dans PendingProfile
            PendingProfile.objects.create(
                personne=personne,
                role='medecin',
                data=pending_data
            )
        return user

class LivreurRegistrationForm(BaseRegistrationForm):
    disponibilite = forms.BooleanField(required=False, initial=True)
    invitation_token = forms.CharField(widget=forms.HiddenInput(), required=True)

    def __init__(self, *args, **kwargs):
        self.pharmacie = kwargs.pop('pharmacie', None)
        super().__init__(*args, **kwargs)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.username = self.generate_username()
        if commit:
            user.save()
            personne = user.personne  # Récupérer la Personne existante
            personne.nom = self.cleaned_data['nom']
            personne.prenom = self.cleaned_data['prenom']
            personne.email = self.cleaned_data['email']
            personne.num_tel = self.cleaned_data['num_tel']
            personne.date_naissance = self.cleaned_data['date_naissance']
            personne.wilaya = self.cleaned_data['wilaya']
            personne.commune = self.cleaned_data['commune']
            personne.sexe = self.cleaned_data['sexe']
            personne.role = 'livreur'
            personne.is_verified = True
            personne.save()
            Livreur.objects.create(
                personne=personne,
                pharmacie=self.pharmacie,
                disponibilite=self.cleaned_data.get('disponibilite', True)
            )
            group, _ = Group.objects.get_or_create(name='Livreurs')
            user.groups.add(group)
        return user