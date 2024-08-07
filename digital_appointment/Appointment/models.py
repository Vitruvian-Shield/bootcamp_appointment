from django.db import models

from accounts.models import User

from Medicine.models import Provider, Service


class Appointment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    provider_id = models.ForeignKey(Provider, on_delete=models.DO_NOTHING)
    service_id = models.ForeignKey(Service, on_delete=models.DO_NOTHING, blank=True)
    appointment_date = models.DateField()
    status = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user_id)
