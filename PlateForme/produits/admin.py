from django.contrib import admin
from .models import Medicament, Parapharmaceutique
from import_export.admin import ImportExportModelAdmin
from .resources import MedicamentResource, ParapharmaceutiqueResource
from django.utils.translation import gettext_lazy as _
from django.contrib.admin import SimpleListFilter

# Personnaliser l'admin de Medicament
class MedicamentAdmin(ImportExportModelAdmin):
    resource_class = MedicamentResource
    list_display = ('nom', 'laboratoire', 'prix', 'categorie', 'dosage', 'prescription_obligatoire')
    search_fields = ('nom', 'laboratoire')
    list_filter = ('categorie', 'prescription_obligatoire', 'remboursement')

    actions = ['modifier_statut_prescription']

    def modifier_statut_prescription(self, request, queryset):
        for medicament in queryset:
            medicament.prescription_obligatoire = not medicament.prescription_obligatoire
            medicament.save()
        self.message_user(request, _("Statut de prescription mis à jour pour les médicaments sélectionnés."))
    modifier_statut_prescription.short_description = _("Modifier statut prescription")


# Personnaliser l'admin de Parapharmaceutique
class ParapharmaceutiqueAdmin(ImportExportModelAdmin):
    resource_class = ParapharmaceutiqueResource
    list_display = ('nom', 'laboratoire', 'prix', 'categorie', 'marque', 'evaluation')
    search_fields = ('nom', 'laboratoire')
    list_filter = ('categorie', 'marque', 'evaluation')


# Exemple de filtre personnalisé (optionnel, à activer si tu veux l'utiliser)
class EvaluationFilter(SimpleListFilter):
    title = _('Évaluation')
    parameter_name = 'evaluation'

    def lookups(self, request, model_admin):
        return (
            ('3+', _('Supérieur à 3')),
        )

    def queryset(self, request, queryset):
        if self.value() == '3+':
            return queryset.filter(evaluation__gt=3)
        return queryset


# Enregistrer les modèles avec l'admin personnalisé
admin.site.register(Medicament, MedicamentAdmin)
admin.site.register(Parapharmaceutique, ParapharmaceutiqueAdmin)
