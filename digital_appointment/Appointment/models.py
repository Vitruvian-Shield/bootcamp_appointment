from django.db import models

status_choices = (
    ('s', 'scheduled'),
    ('c', 'cancelled'),
    ('b', 'completed')

)


class Appointment(models.Model):
    """
    Model representing an appointment for receiving a service.
    """
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    provider_id = models.ForeignKey('Medicine.Provider', on_delete=models.CASCADE)
    service_id = models.ForeignKey('Medicine.Service', on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=1, choices=status_choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
