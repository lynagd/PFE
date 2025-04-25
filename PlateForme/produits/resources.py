# produits/resources.py

from import_export import resources
from .models import Medicament, Parapharmaceutique

class MedicamentResource(resources.ModelResource):
    class Meta:
        model = Medicament
        import_id_fields = ('id_produit',)
        fields = (
            'id_produit', 'nom', 'description', 'laboratoire', 'pays_de_fabrication',
            'notice', 'avertissements', 'prix', 'type_produit', 'categorie',
            'dosage', 'prescription_obligatoire', 'remboursement',
            'molecule_active', 'forme_pharmaceutique', 'type_medicament'
        )

class ParapharmaceutiqueResource(resources.ModelResource):
    class Meta:
        model = Parapharmaceutique
        import_id_fields = ('id_produit',)
        fields = (
            'id_produit', 'nom', 'description', 'laboratoire', 'pays_de_fabrication',
            'notice', 'avertissements', 'prix', 'type_produit', 'categorie',
            'usage', 'marque', 'evaluation'
        )
