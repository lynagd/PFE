from django.urls import path
from . import views

urlpatterns = [
    path('', views.afficher_panier, name='voir_panier'),
    path('modifier/<int:id>/', views.modifier_quantite, name='modifier_quantite'),
    path('supprimer/<int:id>/', views.supprimer_du_panier, name='supprimer_du_panier'),
]
