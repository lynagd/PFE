from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Panier, LignePanier
from produits.models import Produit  # adapte selon ton projet

@login_required
def afficher_panier(request):
    panier, _ = Panier.objects.get_or_create(utilisateur=request.user)
    lignes = LignePanier.objects.filter(panier=panier)
    return render(request, 'panier.html', {'lignes': lignes})

@login_required
def ajouter_au_panier(request, produit_id):
    produit = get_object_or_404(Produit, id=produit_id)
    panier, _ = Panier.objects.get_or_create(utilisateur=request.user)
    ligne, created = LignePanier.objects.get_or_create(
        panier=panier,
        produit=produit,
        defaults={'quantite': 1}
    )
    if not created:
        ligne.quantite += 1
        ligne.save()
    return redirect('afficher_panier')

@login_required
def modifier_quantite(request, ligne_id):
    ligne = get_object_or_404(LignePanier, id=ligne_id, panier__utilisateur=request.user)
    if request.method == 'POST':
        quantite = int(request.POST.get('quantite', 1))
        ligne.quantite = quantite
        ligne.save()
    return redirect('afficher_panier')

@login_required
def supprimer_du_panier(request, id):
    ligne = get_object_or_404(LignePanier, id=id, panier__utilisateur=request.user)
    ligne.delete()
    return redirect('afficher_panier')

