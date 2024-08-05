from django.db import models


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

    appointment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=Status.choices, default=Status.sceduled, max_length=9)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
