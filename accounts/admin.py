# accounts/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Personne, Client, Pharmacie, Medecin, Livreur, PendingProfile

class PersonneAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'email', 'role', 'is_verified')
    list_filter = ('role', 'is_verified')
    search_fields = ('nom', 'prenom', 'email')

class ClientAdmin(admin.ModelAdmin):
    list_display = ('personne',)
    search_fields = ('personne__nom', 'personne__prenom')

class PharmacieAdmin(admin.ModelAdmin):
    list_display = ('nom_pharmacie', 'nom_proprietaire', 'personne', 'display_registre_commerce')
    search_fields = ('nom_pharmacie', 'nom_proprietaire')

    def display_registre_commerce(self, obj):
        if obj.registre_commerce:
            return format_html('<a href="{}" target="_blank">Voir le registre de commerce</a>', obj.registre_commerce.url)
        return "Aucun registre de commerce"
    display_registre_commerce.short_description = "Registre de Commerce"

    def display_registre_commerce_field(self, obj):
        if obj.registre_commerce:
            return format_html('<a href="{}" target="_blank">Voir le registre de commerce</a>', obj.registre_commerce.url)
        return "Aucun registre de commerce"
    display_registre_commerce_field.short_description = "Registre de Commerce"
    
class MedecinAdmin(admin.ModelAdmin):
    list_display = ('personne', 'specialite_medicale', 'display_agrement', 'display_cachet', 'display_signature')
    search_fields = ('personne__nom', 'personne__prenom', 'specialite_medicale')

    def display_agrement(self, obj):
        if obj.agrement:
            return format_html('<a href="{}" target="_blank">Voir l\'agrément</a>', obj.agrement.url)
        return "Aucun agrément"
    display_agrement.short_description = "Agrément"

    def display_cachet(self, obj):
        if obj.cachet:
            return format_html('<a href="{}" target="_blank">Voir le cachet</a>', obj.cachet.url)
        return "Aucun cachet"
    display_cachet.short_description = "Cachet"

    def display_signature(self, obj):
        if obj.signature:
            return format_html('<a href="{}" target="_blank">Voir la signature</a>', obj.signature.url)
        return "Aucune signature"
    display_signature.short_description = "Signature"

class LivreurAdmin(admin.ModelAdmin):
    list_display = ('personne', 'pharmacie', 'disponibilite')
    search_fields = ('personne__nom', 'personne__prenom')

class PendingProfileAdmin(admin.ModelAdmin):
    list_display = ('personne', 'role', 'created_at')
    list_filter = ('role',)
    search_fields = ('personne__nom', 'personne__prenom')

admin.site.register(Personne, PersonneAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Pharmacie, PharmacieAdmin)
admin.site.register(Medecin, MedecinAdmin)
admin.site.register(Livreur, LivreurAdmin)
admin.site.register(PendingProfile, PendingProfileAdmin)