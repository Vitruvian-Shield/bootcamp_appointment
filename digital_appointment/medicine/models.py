from django.db import models
from django.utils.translation import ugettext_lazy as _


class BaseModel(models.Model):
    created_at = models.DateTimeField(_("Record creation timestamp"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Record last update timestamp"), auto_now=True)
    class Meta:
        abstract = True


class Service(BaseModel):
    name = models.CharField(_("Name of the service"), max_length=128)
    description = models.TextField(_("Description of the service"))
    duration = models.DurationField(_("Duration of the service in minutes"))
    price = models.DecimalField(_("Price of the service"), max_digits=12, decimal_places=2)

    def __str__(self):
        return self.name


class Location(BaseModel):
    name = models.CharField(_("Name of the location"), max_length=128)
    address = models.TextField(_("Address of the location"))
    city = models.CharField(_("City"), max_length=128)
    state = models.CharField(_("State"), max_length=128)
    zip_code = models.CharField(_("Zip code"), max_length=128)

    def __str__(self):
        return self.name
