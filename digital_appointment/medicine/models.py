from django.db import models


class Service(models.Model):
    """
    this services model is used to store the services details
    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration=models.IntegerField()
    price=models.DecimalField(max_digits=10,decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

