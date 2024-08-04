from django.db import models
from accounts.models import User
from medicine.models import *

status_choices = (
    ('s', 'scheduled'),
    ('c', 'canceled'),
    ('d', 'completed')
)

class Appointment(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.DO_NOTHING)
    provider = models.ForeignKey(to=Provider, on_delete=models.DO_NOTHING)
    service = models.ForeignKey(to=Service, on_delete=models.DO_NOTHING)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=1, choices=status_choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(default='django.utils.timezone.now')
