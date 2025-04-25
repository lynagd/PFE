from django.shortcuts import render
from django.db.models import Q
from .models import Medicament
from .models import Parapharmaceutique
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404

def recherche_medicaments(request):
    query = request.GET.get('q', '')
    categorie = request.GET.get('categorie', '')
    dosage = request.GET.get('dosage', '')
    forme = request.GET.get('forme_pharmaceutique', '')
    type_medicament = request.GET.get('type_medicament', '')  # "original" ou "generique"

    filters = Q()
    if query:
        filters &= Q(nom__icontains=query)
    if categorie:
        filters &= Q(categorie__icontains=categorie)
    if dosage:
        filters &= Q(dosage__icontains=dosage)
    if forme:
        filters &= Q(forme_pharmaceutique__icontains=forme)
    if type_medicament:
        filters &= Q(type_medicament__iexact=type_medicament)  # champ dans le modèle

    produits = Medicament.objects.filter(filters)
    paginator = Paginator(produits, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'produits/recherche_medicament.html', {
        'produits': page_obj,
        'query': query,
        'categorie': categorie,
        'dosage': dosage,
        'forme': forme,
        'type_medicament': type_medicament,
    })


from .models import Parapharmaceutique

def recherche_parapharmaceutiques(request):
    query = request.GET.get('q', '')
    categorie = request.GET.get('categorie', '')
    marque = request.GET.get('marque', '')
    evaluation = request.GET.get('evaluation', '')
    prix_min = request.GET.get('prix_min', '')
    prix_max = request.GET.get('prix_max', '')

    filters = Q()
    if query:
        filters &= Q(nom__icontains=query)
    if categorie:
        filters &= Q(categorie__icontains=categorie)
    if marque:
        filters &= Q(marque__icontains=marque)
    if evaluation:
        try:
            filters &= Q(evaluation__gte=float(evaluation))
        except ValueError:
            pass
    if prix_min:
        try:
            filters &= Q(prix__gte=float(prix_min))
        except ValueError:
            pass
    if prix_max:
        try:
            filters &= Q(prix__lte=float(prix_max))
        except ValueError:
            pass

    produits = Parapharmaceutique.objects.filter(filters)
    paginator = Paginator(produits, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'produits/recherche_parapharmaceutique.html', {'produits': page_obj})

def detail_medicament(request, id):
    medicament = get_object_or_404(Medicament, id=id)
    return render(request, 'produits/detail_medicament.html', {'medicament': medicament})


def detail_parapharmaceutique(request, id):
    produit = get_object_or_404(Parapharmaceutique, id=id)
    return render(request, 'produits/detail_parapharmaceutique.html', {'produit': produit})