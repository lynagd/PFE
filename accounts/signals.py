# accounts/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User, Group
from allauth.account.signals import user_signed_up
from .models import Personne
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings

@receiver(post_save, sender=User)
def create_user_personne(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'personne'):
        Personne.objects.create(user=instance)
        
@receiver(user_signed_up)
def handle_social_signup(sender, request, user, **kwargs):
    if not hasattr(user, 'personne'):
        social_account = user.socialaccount_set.first()
        if social_account:
            extra_data = social_account.extra_data
            first_name = extra_data.get('given_name', '') if social_account.provider == 'google' else extra_data.get('first_name', '')
            last_name = extra_data.get('family_name', '') if social_account.provider == 'google' else extra_data.get('last_name', '')
            if not user.first_name and first_name:
                user.first_name = first_name
            if not user.last_name and last_name:
                user.last_name = last_name
            user.save()

        personne = Personne.objects.create(
            user=user,
            email=user.email,
            nom=user.last_name or "Nom",
            prenom=user.first_name or "Prénom",
            role='client',
            is_verified=False  # Requires profile completion
        )
        group, _ = Group.objects.get_or_create(name='Clients')
        user.groups.add(group)

        # Redirect to profile completion
        request.session['complete_profile'] = True

@receiver(post_save, sender=Personne)
def send_verification_email(sender, instance, created, **kwargs):
    if created and instance.role == 'client' and not instance.is_verified:
        verification_link = f"{settings.SITE_URL}{reverse('verify_email', args=[str(instance.id)])}"
        send_mail(
            'Vérifiez votre adresse email',
            f'Veuillez cliquer sur ce lien pour vérifier votre email : {verification_link}',
            settings.DEFAULT_FROM_EMAIL,
            [instance.email],
            fail_silently=False
        )