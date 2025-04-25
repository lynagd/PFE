from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class Panier(models.Model):
    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE)
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Panier de {self.utilisateur.username}"

class LignePanier(models.Model):
    panier = models.ForeignKey(Panier, on_delete=models.CASCADE, related_name='lignes')

    # Champs pour support de plusieurs types de produits (Medicament ou Parapharmaceutique)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    produit = GenericForeignKey('content_type', 'object_id')

    quantite = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantite} x {self.produit.nom} dans {self.panier}"
