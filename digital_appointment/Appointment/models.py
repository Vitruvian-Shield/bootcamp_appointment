from django.db import models


class Appointment(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    provider_id = models.ForeignKey('Medicine.Provider', on_delete=models.CASCADE)
    service_id = models.ForeignKey('Medicine.Service', on_delete=models.CASCADE)
    appointment_date = models.DateField()
    status = models.CharField(max_length=20, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
