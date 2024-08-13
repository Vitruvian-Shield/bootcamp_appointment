from django.db import models
from accounts.models import User
# foreign key have one to many relationship

#  create Locations table
class Locations(models.Model):
   id = models.AutoField(primary_key=True)
   name = models.CharField(max_length=35)
   address = models.CharField(max_length=200)
   city = models.CharField(max_length=50)
   state = models.CharField(max_length=60)
   zip_code = models.CharField(max_length=50)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
   
   def __str__(self):   # readable representation for the model instance
      return f"Name: {self.name}, city: {self.city}, Address: {self.address}, ZipCode: {self.zip_code}"
   
   class Meta: # specifies the name of the database table
      db_table = "locations"


#  create Services table
class Services(models.Model):
   id = models.AutoField(primary_key=True)
   name = models.CharField(max_length=35)
   description = models.TextField(max_length=255)
   duration = models.IntegerField(default=0)
   price = models.DecimalField(max_digits=15, decimal_places=3, default=0)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
   
   def __str__(self):   # readable representation for the model instance
      return f"Name: {self.name}, Price: {self.price}, Description: {self.description}"
   
   class Meta: # specifies the name of the database table
      db_table = "services"


#  create Providers table
class Providers(models.Model):
   id = models.AutoField(primary_key=True)
   user_id = models.OneToOneField(User, on_delete=models.CASCADE, null=True)  # here i def ono to one rel
   specialty = models.CharField(max_length=60)
   location_id = models.ForeignKey(Locations, on_delete=models.CASCADE)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
   
   def __str__(self):   # readable representation for the model instance
      return f"UserId: {self.user_id}, Specialty: {self.specialty}"
   
   class Meta: # specifies the name of the database table
      db_table = "providers"
