from django.db import models
from accounts.models import User
from medicine.models import Provider, Service


class Appointment(models.Model):
    STATUS_CHOICES = (
        ('scheduled', 'scheduled'),
        ('canceled', 'canceled'),
        ('completed', 'completed'),
        ('other', 'other'),
    )

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    provider_id = models.ForeignKey(Provider, on_delete=models.CASCADE)
    service_id = models.ForeignKey(Service, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)