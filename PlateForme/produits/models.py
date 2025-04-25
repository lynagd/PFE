from django.db import models  # Importation des classes nécessaires pour créer des modèles Django

# Classe abstraite représentant un produit générique (médicament ou parapharmaceutique)
class Produit(models.Model):
    id_produit = models.BigIntegerField(default=0, unique=True)  # ID unique du produit
    nom = models.CharField(max_length=255, default='Produit sans nom') # Nom du produit
    description = models.TextField(default='Aucune description')  # Description du produit
    laboratoire = models.CharField(max_length=100, default='Laboratoire inconnu')  # Laboratoire fabricant
    pays_de_fabrication = models.CharField(max_length=100, default='Pays inconnu')  # Pays de fabrication
    notice = models.TextField(default='Notice non fournie')  # Notice du produit
    avertissements = models.TextField(default='Aucun avertissement')  # Avertissements
    prix = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)  # Prix
    image = models.ImageField(upload_to='produits/', blank=True, null=True, default=None) 

    # Choix possibles pour le type de produit
    TYPE_CHOICES = [
        ('medicament', 'Médicament'),
        ('parapharmaceutique', 'Produit Parapharmaceutique'),
    ]
    type_produit = models.CharField(max_length=20, choices=TYPE_CHOICES, default='medicament')
 
    class Meta:
        abstract = True  # Ce modèle est abstrait

    def __str__(self):
        return self.nom


# Classe représentant un médicament
class Medicament(Produit):
    # Choix spécifiques aux catégories de médicaments
    CATEGORIE_CHOICES = [
        ('Antalgiques', 'Antalgiques'),
        ('Antibiotiques', 'Antibiotiques'),
        ('Anti-inflammatoires', 'Anti-inflammatoires'),
        ('Antispasmodiques', 'Antispasmodiques'),
        ('Antihistaminiques', 'Antihistaminiques'),
        ('Inhibiteurs de pompe à protons', 'Inhibiteurs de pompe à protons'),
        ('Antidiabétiques', 'Antidiabétiques'),
        ('Antihypertenseurs', 'Antihypertenseurs'),
        ('Antidépresseurs', 'Antidépresseurs'),
        ('Antiviraux', 'Antiviraux'),
        ('Antifongiques', 'Antifongiques'),
        ('Anticoagulants', 'Anticoagulants'),
        ('Vaccins', 'Vaccins'),
    ]

    categorie = models.CharField(max_length=50, choices=CATEGORIE_CHOICES, default='Antalgiques')

    dosage = models.CharField(max_length=50, default='Dosage inconnu')
    prescription_obligatoire = models.BooleanField(default=False)
    remboursement = models.BooleanField(default=False)
    molecule_active = models.CharField(max_length=100, default='Molécule non précisée')
    forme_pharmaceutique = models.CharField(max_length=100, default='Forme non précisée')

    TYPE_MEDICAMENT_CHOICES = [
        ('original', 'Original'),
        ('generique', 'Générique'),
    ]
    type_medicament = models.CharField(max_length=50, choices=TYPE_MEDICAMENT_CHOICES, default='original')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    'id_produit', 'nom', 'description', 'laboratoire',
                    'pays_de_fabrication', 'notice', 'avertissements', 'prix',
                    'categorie', 'type_produit', 'dosage',
                    'prescription_obligatoire', 'remboursement',
                    'molecule_active', 'forme_pharmaceutique', 'type_medicament'
                ],
                name='unique_medicament_complet'
            )
        ]


# Classe représentant un produit parapharmaceutique
class Parapharmaceutique(Produit):
    # Choix spécifiques aux catégories parapharmaceutiques
    CATEGORIE_CHOICES = [
    ('Santé', 'Santé'),
    ('Hygiène', 'Hygiène'),
    ('Soins du visage et du corps', 'Soins du visage et du corps'),
    ('Capillaire', 'Capillaire'),
    ('Hygiène bucco-dentaire', 'Hygiène bucco-dentaire'),
    ('Bébé', 'Bébé'),
]

    categorie = models.CharField(max_length=50, choices=CATEGORIE_CHOICES, default='Hygiène')

    usage = models.TextField(default='Usage non précisé')
    marque = models.CharField(max_length=100, default='Marque non précisée')
    evaluation = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    'id_produit', 'nom', 'description', 'laboratoire',
                    'pays_de_fabrication', 'notice', 'avertissements', 'prix',
                    'categorie', 'type_produit', 'usage', 'marque', 'evaluation'
                ],
                name='unique_parapharmaceutique_complet'
            )
        ]

