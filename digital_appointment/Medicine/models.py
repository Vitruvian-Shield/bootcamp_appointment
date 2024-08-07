from django.db import models
from accounts.models import User


class Locations(models.Model):
   id = models.AutoField(primary_key=True)
   name = models.CharField(max_length=35)
   address = models.CharField(max_length=200)
   city = models.CharField(max_length=50)
   state = models.CharField(max_length=60)
   zip_code = models.CharField(max_length=50)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
   
   def __str__(self):
      return f"Name: {self.name}, city: {self.city}, Address: {self.address}, ZipCode: {self.zip_code}"


class Services(models.Model):
   id = models.AutoField(primary_key=True)
   name = models.CharField(max_length=35)
   description = models.TextField(max_length=255)
   duration = models.IntegerField(default=0)
   price = models.DecimalField(max_digits=15, decimal_places=3, default=0)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
   
   def __str__(self):
      return f"Name: {self.name}, Price: {self.price}, Description: {self.description}"


class Providers(models.Model):
   id = models.AutoField(primary_key=True)
   user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
   specialty = models.CharField(max_length=60)
   location_id = models.ForeignKey(Locations, on_delete=models.CASCADE)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
   
   def __str__(self):
      return f"UserId: {self.user_id}, Specialty: {self.specialty}"
   
   
