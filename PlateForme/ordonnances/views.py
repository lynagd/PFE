'''from django.shortcuts import render
from django.shortcuts import render, get_object_or_404, redirect
from .models import Ordonnance, Client, Medecin, Produit, LigneOrdonnance
from .forms import OrdonnanceForm, LigneOrdonnanceFormSet
from django.contrib.auth.decorators import login_required

@login_required
def ajouter_ordonnance(request, patient_id):
    patient = get_object_or_404(Client, id=patient_id)
    medecin = get_object_or_404(Medecin, user=request.user)  # ou selon comment tu lies Medecin à User

    if request.method == "POST":
        ordonnance_form = OrdonnanceForm(request.POST)
        ligne_formset = LigneOrdonnanceFormSet(request.POST)

        if ordonnance_form.is_valid() and ligne_formset.is_valid():
            ordonnance = ordonnance_form.save(commit=False)
            ordonnance.medecin = medecin
            ordonnance.patient = patient
            ordonnance.save()

            lignes = ligne_formset.save(commit=False)
            for ligne in lignes:
                ligne.ordonnance = ordonnance
                ligne.save()

            return redirect('detail_patient', patient_id=patient.id)
    else:
        ordonnance_form = OrdonnanceForm(initial={'date_prescription': timezone.now()})
        ligne_formset = LigneOrdonnanceFormSet()

    return render(request, 'ordonnances/ajouter_ordonnance.html', {
        'ordonnance_form': ordonnance_form,
        'ligne_formset': ligne_formset,
        'patient': patient
    })
'''