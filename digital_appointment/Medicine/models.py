from django.db import models

from digital_appointment.accounts.models import User


class Locations(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=500)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Services(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    duration = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Providers(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    speciality = models.CharField(max_length=200)
    locations_id = models.ForeignKey(Locations, on_delete=models.DO_NOTHING)  # khode location behtar nist mohem nist kheali
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_id
