from django.db import models
from accounts.models import User
from medicine.models import Provider, Service
import datetime


class Appointment(models.Model):
    """
    this appointment model is used to store appointment details
    """

    class Status(models.TextChoices):
        """
        this enum is used to define the appointment status
        """
        sceduled = "Scheduled"
        cancelled = "Cancelled"
        completed = "Completed"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    """
    attribute
    """
    appointment_date = models.DateTimeField(default=datetime.datetime.now())
    status = models.CharField(choices=Status.choices, default=Status.sceduled, max_length=9)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
