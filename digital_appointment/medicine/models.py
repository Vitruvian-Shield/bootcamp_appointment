from django.contrib.auth.hashers import make_password
from django.db import models
from accounts.models import User


class DoctorsModel(models.Model):
    """Doctors personal information"""

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=11)
    email = models.EmailField(max_length=100)
    zip_code = models.CharField(max_length=10, unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)
    speciality = models.ForeignKey('medicine.ServiceModel', on_delete=models.CASCADE)
    location = models.ForeignKey('medicine.LocationModel', on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.pk:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


class ServiceModel(models.Model):
    """Doctors medical information"""

    speciality = models.CharField(max_length=50)
    medical_system_number = models.CharField(max_length=5)
    services = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.speciality

    class Meta:
        db_table = "Service"


class LocationModel(models.Model):
    """Doctor's office addresses"""

    province = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50)
    allay = models.CharField(max_length=50, blank=True, null=True)
    plate_number = models.CharField(max_length=50)
    unit = models.SmallIntegerField()
    address = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.province} / {self.city}'

    class Meta:
        db_table = "Location"


