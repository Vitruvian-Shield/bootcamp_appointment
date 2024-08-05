from django.db import models
from ..accounts.models import User
from ..medicine.models import Location, Service, Provider


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('sc', 'Scheduled'), ('ca', 'Cancelled'), ('co', 'Completed')
    ]

    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='appointments')
    provider = models.ForeignKey(to=Provider, on_delete=models.CASCADE, related_name='appointments')
    service = models.ForeignKey(to=Service, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES,default='sc')
    description = models.TextField()
    update_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ID: {self.id}\n USER: {self.user}\n PROVIDER: {self.provider}\n STATUS: {self.status}"
