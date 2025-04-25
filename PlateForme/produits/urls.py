
from django.urls import path
from . import views

urlpatterns = [
    path('medicaments/', views.recherche_medicaments, name='recherche_medicaments'),
    path('parapharmaceutiques/', views.recherche_parapharmaceutiques, name='recherche_parapharmaceutiques'),
    path('medicament/<int:id>/', views.detail_medicament, name='detail_medicament'),
    path('parapharmaceutique/<int:id>/', views.detail_parapharmaceutique, name='detail_parapharmaceutique'),
]

