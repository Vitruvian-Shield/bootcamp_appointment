from django.db import models

from digital_appointment.accounts.models import User

from digital_appointment.Medicine.models import Providers,Services


class Appointments(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    provider_id = models.ForeignKey(Providers, on_delete=models.DO_NOTHING)
    service_id = models.ForeignKey(Services, on_delete=models.DO_NOTHING,blank=True)
    appointment_date = models.DateField()
    status = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
