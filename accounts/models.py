# accounts/models.py
from datetime import date
from django.db import models
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid
from django.core.exceptions import ValidationError

class Personne(models.Model):
    ROLE_CHOICES = [
        ('client', 'Client'),
        ('pharmacie', 'Pharmacie'),
        ('medecin', 'Medecin'),
        ('livreur', 'Livreur'),
        ('is_admin', 'Administrateur'),
    ]
    SEXE_CHOICES = [
        ('masculin', 'Masculin'),
        ('feminin', 'Féminin'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='personne')
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField(null=True, blank=True)  # Required for clients in clean()
    num_tel = models.CharField(max_length=20)
    wilaya = models.CharField(max_length=100, blank=True, null=True)
    commune = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    sexe = models.CharField(max_length=10, choices=SEXE_CHOICES, blank=True, null=True)  # Required for clients in clean()

    @property
    def age(self):
        if self.date_naissance:
            today = date.today()
            return today.year - self.date_naissance.year - ((today.month, today.day) < (self.date_naissance.month, self.date_naissance.day))
        return None

    def clean(self):
        errors = {}
        if not self.nom:
            errors['nom'] = 'Le nom est requis.'
        if not self.prenom:
            errors['prenom'] = 'Le prénom est requis.'
        if not self.num_tel:
            errors['num_tel'] = 'Le numéro de téléphone est requis.'
        if not self.email:
            errors['email'] = 'L’email est requis.'
        if self.role == 'client':
            if not self.sexe:
                errors['sexe'] = 'Le sexe est requis pour un client.'
            if not self.date_naissance:
                errors['date_naissance'] = 'La date de naissance est requise pour un client.'
        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return f"{self.nom} {self.prenom} - {self.get_role_display() if self.role else 'Sans rôle'}"

class PendingProfile(models.Model):
    ROLE_CHOICES = [
        ('pharmacie', 'Pharmacie'),
        ('medecin', 'Medecin'),
    ]
    
    personne = models.OneToOneField('Personne', on_delete=models.CASCADE, related_name='pending_profile')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    data = models.JSONField()  # Stocke les données spécifiques (agrement, cachet, etc.) sous forme de JSON
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pending {self.role} profile for {self.personne}"
    
class Client(models.Model):
    personne = models.OneToOneField(Personne, on_delete=models.CASCADE, related_name='client')
    photo_de_profile = models.ImageField(upload_to='client_profiles/')

    def clean(self):
        if not self.photo_de_profile:
            raise ValidationError({'photo_de_profile': 'La photo de profil est requise pour un client.'})

    def __str__(self):
        return f"{self.personne.nom} {self.personne.prenom}"

class Pharmacie(models.Model):
    personne = models.OneToOneField(Personne, on_delete=models.CASCADE, related_name='pharmacie')
    nom_pharmacie = models.CharField(max_length=255)
    nom_proprietaire = models.CharField(max_length=255)
    registre_commerce = models.FileField(upload_to='pharmacy_docs/')
    localisation = models.CharField(max_length=255)  # Should include GPS coordinates (e.g., "lat,lon")
    latitude = models.FloatField(null=True, blank=True)  
    longitude = models.FloatField(null=True, blank=True)
    heure_ouverture = models.TimeField()
    heure_fermeture = models.TimeField()
    offre_livraison = models.BooleanField(default=False)
    lien_reseau_sociaux = models.URLField(blank=True, null=True)
    invitation_token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def clean(self):
        errors = {}
        if not self.nom_pharmacie:
            errors['nom_pharmacie'] = 'Le nom de la pharmacie est requis.'
        if not self.nom_proprietaire:
            errors['nom_proprietaire'] = 'Le nom du propriétaire est requis.'
        if not self.registre_commerce:
            errors['registre_commerce'] = 'Le registre de commerce est requis.'
        if not self.localisation:
            errors['localisation'] = 'La localisation est requise.'
        if not self.heure_ouverture:
            errors['heure_ouverture'] = 'L’heure d’ouverture est requise.'
        if not self.heure_fermeture:
            errors['heure_fermeture'] = 'L’heure de fermeture est requise.'
        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return self.nom_pharmacie

class Livreur(models.Model):
    personne = models.OneToOneField(Personne, on_delete=models.CASCADE, related_name='livreur')
    pharmacie = models.ForeignKey(Pharmacie, on_delete=models.CASCADE, related_name='livreurs')
    disponibilite = models.BooleanField(default=True)

    def clean(self):
        if not self.pharmacie:
            raise ValidationError({'pharmacie': 'Le livreur doit être associé à une pharmacie.'})

    def __str__(self):
        return f"{self.personne.nom} {self.personne.prenom} - {self.pharmacie.nom_pharmacie}"

class Medecin(models.Model):
    personne = models.OneToOneField(Personne, on_delete=models.CASCADE, related_name='medecin')
    specialite_medicale = models.CharField(max_length=100)
    agrement = models.FileField(upload_to='doctor_docs/')
    addresse = models.CharField(max_length=255)  # Should include GPS coordinates (e.g., "lat,lon")
    cachet = models.ImageField(upload_to='doctor_stamps/', null=True, blank=True)
    signature = models.ImageField(upload_to='doctor_signatures/', null=True, blank=True)

    def clean(self):
        errors = {}
        if not self.specialite_medicale:
            errors['specialite_medicale'] = 'La spécialité médicale est requise.'
        if not self.agrement:
            errors['agrement'] = 'Le fichier d’agrément est requis.'
        if not self.addresse:
            errors['addresse'] = 'L’adresse est requise.'
        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return f"Dr. {self.personne.nom} {self.personne.prenom}"