from django.contrib import admin
from .models import Personne, Pharmacie, Medecin, Livreur, Client

class PersonneAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'email', 'role', 'is_verified')
    list_filter = ('role', 'is_verified')
    search_fields = ('nom', 'prenom', 'email')

class PharmacieAdmin(admin.ModelAdmin):
    list_display = ('nom_pharmacie', 'localisation', 'offre_livraison')
    search_fields = ('nom_pharmacie', 'localisation')

class MedecinAdmin(admin.ModelAdmin):
    list_display = ('personne', 'specialite_medicale')
    search_fields = ('personne__nom', 'personne__prenom', 'specialite_medicale')

class LivreurAdmin(admin.ModelAdmin):
    list_display = ('personne', 'pharmacie', 'disponibilite')
    search_fields = ('personne__nom', 'personne__prenom', 'pharmacie__nom_pharmacie')

admin.site.register(Personne, PersonneAdmin)
admin.site.register(Pharmacie, PharmacieAdmin)
admin.site.register(Medecin, MedecinAdmin)
admin.site.register(Livreur, LivreurAdmin)
admin.site.register(Client)