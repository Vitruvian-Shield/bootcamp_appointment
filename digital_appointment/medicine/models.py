from django.db import models

# Create your models here.


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


class Service(BaseModel):
     name = models.CharField(max_length=128)
     description = models.TextField()
     duration = models.DurationField()
     price = models.DecimalField(max_digits=12, decimal_places=2)

