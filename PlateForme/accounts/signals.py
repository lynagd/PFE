from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User, Group
from allauth.account.signals import user_signed_up
from .models import Personne

@receiver(post_save, sender=User)
def create_user_personne(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'personne'):
        Personne.objects.create(user=instance)

@receiver(user_signed_up)
def handle_social_signup(sender, request, user, **kwargs):
    """Gère la création et configuration du profil lors d'une inscription sociale"""
    if not hasattr(user, 'personne'):
        # Extraction des données du compte social
        social_account = user.socialaccount_set.first()
        if social_account:
            extra_data = social_account.extra_data
            
            # Traiter les données selon le provider
            if social_account.provider == 'google':
                first_name = extra_data.get('given_name', '')
                last_name = extra_data.get('family_name', '')
            elif social_account.provider == 'facebook':
                first_name = extra_data.get('first_name', '')
                last_name = extra_data.get('last_name', '')
            else:
                first_name = user.first_name
                last_name = user.last_name
                
            # Mettre à jour les noms de l'utilisateur si nécessaire
            if not user.first_name and first_name:
                user.first_name = first_name
            if not user.last_name and last_name:
                user.last_name = last_name
            user.save()
        
        # Créer le profil Personne
        personne = Personne.objects.create(
            user=user,
            email=user.email,
            nom=user.last_name or "Nom",
            prenom=user.first_name or "Prénom",
            role='client',
            is_verified=True
        )
        
        # Ajouter au groupe Clients
        group, _ = Group.objects.get_or_create(name='Clients')
        user.groups.add(group)