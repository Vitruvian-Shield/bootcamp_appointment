from django.db import models
from accounts.models import User

class Location(models.Model):
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=16)
    state = models.CharField(max_length=16)
    zip_code = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default='django.utils.timezone.now')

class Provider(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=20)
    location = models.ForeignKey(to=Location, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default='django.utils.timezone.now')

class Service(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField()
    duration = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default='django.utils.timezone.now')