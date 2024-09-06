from django.db import models


class Provider(models.Model):
    user = models.OneToOneField('accounts.User', on_delete=models.CASCADE, related_name="provider")
    speciality = models.CharField(max_length=255)
    location = models.ForeignKey('medicine.Location', on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    rate_sum = models.PositiveIntegerField(default=0)
    rate_num = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.user} - {self.speciality}'
    
    class Meta:
        db_table = "provider"


class Location(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "location"


class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    duration = models.IntegerField(default=30)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "service"

