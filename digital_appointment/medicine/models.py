from django.db import models
from ..accounts.models import User


class Location(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}, City : {self.city}"


class Service(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=256)
    duration = models.IntegerField(default=0)
    zip_code = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=16, decimal_places=3)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"


class Provider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.ForeignKey(to=Location, on_delete=models.CASCADE, related_name='providers')
    specialty = models.CharField(max_length=256)
    # I believe this should be choice based.
    # a provider can have many specialties and rel should be one-to-many.
    # can also be good for sorting and indexing
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.specialty}"
