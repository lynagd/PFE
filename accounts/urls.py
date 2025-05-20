# accounts/urls.py
from django.urls import path, include
from .views import (
    ClientListAPIView, LivreurListAPIView, MedecinListAPIView, approve_profile, home, nearby_pharmacies, pharmacie_dashboard, pharmacy_profile, register, 
    register_livreur, reject_profile, verify_profiles, CustomLoginView,
    PharmacieListAPIView
)
from django.contrib.auth.views import LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView

app_name = 'accounts'
urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='accounts:login'), name='logout'),
    path('register/', register, name='register'),
    path('register/deliverer/', register_livreur, name='register_livreur'),
    path('dashboard/pharmacy/', pharmacie_dashboard, name='pharmacie_dashboard'),
    path('verify_profiles/', verify_profiles, name='verify_profiles'),
    path('approve/<int:personne_id>/<str:role>/', approve_profile, name='approve_profile'),
    path('verify/reject/<int:personne_id>/', reject_profile, name='reject_profile'),
    path('home/', home, name='home'),
    path('nearby-pharmacies/', nearby_pharmacies, name='nearby_pharmacies'),  
    path('pharmacy/<int:pharmacy_id>/', pharmacy_profile, name='pharmacy_profile'),  
    path('api/pharmacies/', PharmacieListAPIView.as_view(), name='api_pharmacie_list'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/clients/', ClientListAPIView.as_view(), name='api_client_list'),
    path('api/medecins/', MedecinListAPIView.as_view(), name='api_medecin_list'),
    path('api/livreurs/', LivreurListAPIView.as_view(), name='api_livreur_list'),
]