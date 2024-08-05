from django.db import models
from ..accounts.models import User, LocationsModel


class LocationsModel(models.Model):
    """ locations table """

    name = models.CharField(max_length=50)
    address = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=5)


class ServicesModel(models.Model):
    """Services Table"""

    name = models.CharField(max_length=50)
    description = models.TextField()
    duration = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ProviderModel(models.Model):
    """Provider Table"""

    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id")
    speciality = models.CharField(max_length=100)
    location_id = models.ForeignKey(LocationsModel, on_delete=models.CASCADE, related_name="location_id")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

