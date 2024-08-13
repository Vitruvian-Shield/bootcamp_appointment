from django.db import models
from accounts.models import User
from Medicine.models import Services, Providers

class Appointments(models.Model):
   # made closable states for status with( choices ) feature
   STATUS_CHOICES = [
      ('SCH', 'Scheduled'),
      ('COM', 'Completed'),
      ('CAN', 'Canceled')
   ]
   # ForeignKey -> have one to many relation
   id = models.AutoField(primary_key=True)
   user_id = models.ForeignKey(User, on_delete=models.CASCADE)
   provider_id = models.ForeignKey(Providers, on_delete=models.CASCADE, null=True)
   service_id = models.ForeignKey(Services, on_delete=models.CASCADE, null=True)
   appointment_date = models.DateTimeField()
   status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='SCH')
   created_at = models.DateTimeField(auto_now_add=True)    # first time added
   updated_at = models.DateTimeField(auto_now=True)    # last update
   
   def __str__(self):   # the thing (str) have to show default in shell or admin page
      return f"UserId: {self.user_id}, ProviderId: {self.provider_id}, AppointmentDate: {self.appointment_date}"
   
   class Meta: # specifies the name of the database table
      db_table = "appointments"