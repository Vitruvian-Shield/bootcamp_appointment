from django.db import models


class ServicesModel(models.Model):
    """Services Table"""

    name = models.CharField(max_length=50)
    description = models.TextField()
    duration = models.DurationField()
    price = models.DecimalField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


