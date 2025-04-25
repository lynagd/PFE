from django.urls import path, include
from .views import (
    approve_profile, home, pharmacie_dashboard, register, 
    register_livreur, reject_profile, verify_profiles,
    CustomLoginView
)
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', register, name='register'),
    path('register/deliverer/', register_livreur, name='register_livreur'),
    path('dashboard/pharmacy/', pharmacie_dashboard, name='pharmacie_dashboard'),
    path('verify_profiles/', verify_profiles, name='verify_profiles'),
    path('approve/<int:personne_id>/<str:role>/', approve_profile, name='approve_profile'),
    path('verify/reject/<int:personne_id>/', reject_profile, name='reject_profile'),
    path('home/', home, name='home'),
    path('accounts/', include('allauth.urls')),
]