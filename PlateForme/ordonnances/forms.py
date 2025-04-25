from django import forms
from .models import Ordonnance, LigneOrdonnance
from django.forms import inlineformset_factory

class OrdonnanceForm(forms.ModelForm):
    class Meta:
        model = Ordonnance
        fields = ['Instruction_spécifique', 'Instruction_supplementaire']

LigneOrdonnanceFormSet = inlineformset_factory(
    Ordonnance,
    LigneOrdonnance,
    fields=['produit', 'posologie'],
    extra=3,  # nombre de lignes par défaut
    can_delete=False
)
