from rest_framework import serializers
from .models import Pharmacie,Client, Medecin, Livreur

class PharmacieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacie
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class MedecinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecin
        fields = '__all__'

class LivreurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livreur
        fields = '__all__'