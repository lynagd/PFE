from django.db import models
from django.contrib.postgres.fields import ArrayField
from PlateForme.accounts.models import Client, Medecin

class Ordonnance(models.Model):
    medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE)
    patient = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='ordonnances')
    date_prescription = models.DateField()
    code_barre = models.CharField(max_length=100)

    produits_prescrits = ArrayField(
        base_field=models.CharField(max_length=100),
        default=list,
        blank=True
    )

    instruction_specifique = models.CharField(max_length=255, default='', blank=True)
    instruction_supplementaire = models.CharField(max_length=255, default='', blank=True)

    def __str__(self):
        return f"Ordonnance pour {self.patient} par {self.medecin}"
