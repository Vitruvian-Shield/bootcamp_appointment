from django.db import models

from accounts.models import User


class Location(models.Model):
    """a class to represent the location of the appointment"""
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=500)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    """a class to represent the service of the appointment"""
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    duration = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Provider(models.Model):
    """a class to represent the provider of the appointment"""
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    speciality = models.CharField(max_length=200)
    locations_id = models.ForeignKey(Location, on_delete=models.DO_NOTHING)  # khode location behtar nist mohem nist kheali
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user_id)
