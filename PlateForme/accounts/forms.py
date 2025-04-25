import uuid
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User, Group
from .models import Personne, Pharmacie, Medecin, Livreur

class EmailAuthForm(AuthenticationForm):
    username = forms.EmailField(label='Email')

class ClientRegistrationForm(UserCreationForm):
    nom = forms.CharField(required=True)
    prenom = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    num_tel = forms.CharField(required=True)
    date_naissance = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), required=True)
    photo_de_profile = forms.ImageField(required=False)
    wilaya = forms.CharField(required=True)
    commune = forms.CharField(required=True)
    sexe = forms.ChoiceField(choices=Personne.SEXE_CHOICES, required=True)

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Cet email est déjà utilisé.")
        return email

    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if not user.username:
            base = self.cleaned_data.get('first_name', 'user').lower()
            unique_username = f"{base}_{uuid.uuid4().hex[:6]}"
            while User.objects.filter(username=unique_username).exists():
                unique_username = f"{base}_{uuid.uuid4().hex[:6]}"
            user.username = unique_username
        if commit:
            user.save()

            if hasattr(user, 'personne'):
                personne = user.personne
                personne.nom = self.cleaned_data['nom']
                personne.prenom = self.cleaned_data['prenom']
                personne.email = self.cleaned_data['email']
                personne.num_tel = self.cleaned_data['num_tel']
                personne.date_naissance = self.cleaned_data['date_naissance']
                personne.wilaya = self.cleaned_data['wilaya']
                personne.commune = self.cleaned_data['commune']
                personne.sexe = self.cleaned_data['sexe']
                personne.photo_de_profile = self.cleaned_data.get('photo_de_profile')
                personne.role = 'client'
                personne.is_verified = True
                personne.save()

                group, _ = Group.objects.get_or_create(name='Clients')
                user.groups.add(group)
        return user


class PharmacieRegistrationForm(UserCreationForm):
    nom = forms.CharField(required=True)
    prenom = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    num_tel = forms.CharField(required=True)
    nom_pharmacie = forms.CharField(required=True)
    nom_proprietaire = forms.CharField(required=True)
    registre_commerce = forms.FileField(required=True)
    localisation = forms.CharField(required=True)
    heure_ouverture = forms.TimeField(widget=forms.TimeInput(attrs={'type': 'time'}), required=True)
    heure_fermeture = forms.TimeField(widget=forms.TimeInput(attrs={'type': 'time'}), required=True)
    offre_livraison = forms.BooleanField(required=False)
    lien_reseau_sociaux = forms.URLField(required=False)

    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Cet email est déjà utilisé.")
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if not user.username:
            base = self.cleaned_data.get('first_name', 'user').lower()
            unique_username = f"{base}_{uuid.uuid4().hex[:6]}"
            while User.objects.filter(username=unique_username).exists():
                unique_username = f"{base}_{uuid.uuid4().hex[:6]}"
            user.username = unique_username
        if commit:
            user.save()

            if hasattr(user, 'personne'):
                personne = user.personne
                personne.nom = self.cleaned_data['nom']
                personne.prenom = self.cleaned_data['prenom']
                personne.email = self.cleaned_data['email']
                personne.num_tel = self.cleaned_data['num_tel']
                personne.nom_pharmacie = self.cleaned_data['nom_pharmacie']
                personne.nom_proprietaire = self.cleaned_data['nom_proprietaire']
                personne.registre_commerce = self.cleaned_data['registre_commerce']
                personne.localisation = self.cleaned_data['localisation']
                personne.heure_ouverture = self.cleaned_data['heure_ouverture']
                personne.heure_fermeture = self.cleaned_data['heure_fermeture']
                personne.offre_livraison = self.cleaned_data.get('offre_livraison', False)
                personne.lien_reseau_sociaux = self.cleaned_data.get('lien_reseau_sociaux')
                personne.role = 'pharmacie'
                personne.is_verified = False
                personne.save()
        return user


class MedecinRegistrationForm(UserCreationForm):
    nom = forms.CharField(required=True)
    prenom = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    num_tel = forms.CharField(required=True)
    date_naissance = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), required=True)
    specialite_medicale = forms.CharField(required=True)
    agrement = forms.FileField(required=True)
    addresse = forms.CharField(required=True)
    cachet = forms.ImageField(required=False)
    signature = forms.ImageField(required=False)

    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Cet email est déjà utilisé.")
        return email
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if not user.username:
            base = self.cleaned_data.get('first_name', 'user').lower()
            unique_username = f"{base}_{uuid.uuid4().hex[:6]}"
            while User.objects.filter(username=unique_username).exists():
                unique_username = f"{base}_{uuid.uuid4().hex[:6]}"
            user.username = unique_username
        if commit:
            user.save()

            if hasattr(user, 'personne'):
                personne = user.personne
                personne.nom = self.cleaned_data['nom']
                personne.prenom = self.cleaned_data['prenom']
                personne.email = self.cleaned_data['email']
                personne.num_tel = self.cleaned_data['num_tel']
                personne.date_naissance = self.cleaned_data['date_naissance']
                personne.specialite_medicale = self.cleaned_data['specialite_medicale']
                personne.agrement = self.cleaned_data['agrement']
                personne.addresse = self.cleaned_data['addresse']
                personne.cachet = self.cleaned_data.get('cachet')
                personne.signature = self.cleaned_data.get('signature')
                personne.role = 'medecin'
                personne.is_verified = False
                personne.save()
        return user


class LivreurRegistrationForm(UserCreationForm):
    nom = forms.CharField(required=True)
    prenom = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    num_tel = forms.CharField(required=True)
    date_naissance = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), required=True)
    disponibilite = forms.BooleanField(required=False, initial=True)
    invitation_token = forms.CharField(widget=forms.HiddenInput(), required=True)

    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Cet email est déjà utilisé.")
        return email
    
    def __init__(self, *args, **kwargs):
        self.pharmacie = kwargs.pop('pharmacie', None)
        super().__init__(*args, **kwargs)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if not user.username:
            base_username = self.cleaned_data.get('first_name', 'livreur')
            unique_username = f"{base_username.lower()}_{uuid.uuid4().hex[:6]}"
            while User.objects.filter(username=unique_username).exists():
                unique_username = f"{base_username.lower()}_{uuid.uuid4().hex[:6]}"
            user.username = unique_username
        if commit:
            user.save()

            if hasattr(user, 'personne'):
                personne = user.personne
                personne.nom = self.cleaned_data['nom']
                personne.prenom = self.cleaned_data['prenom']
                personne.email = self.cleaned_data['email']
                personne.num_tel = self.cleaned_data['num_tel']
                personne.date_naissance = self.cleaned_data['date_naissance']
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