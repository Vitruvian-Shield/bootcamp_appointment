from django.db import models
from accounts.models import User
from Medicine.models import Services

class Appointments(models.Model):
   STATUS_CHOICES  = {'SC': 'Scheduled', 'CO': 'Completed', 'CA': 'Canceled'}
   
   id = models.AutoField(primary_key=True)
   user_id = models.ForeignKey(User, on_delete=models.CASCADE)
   # provider_id = models.ForeignKey(Providers, on_delete=models.CASCADE)
   service_id = models.ForeignKey(Services, on_delete=models.CASCADE)
   appointment_date = models.DateTimeField()
   status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='SC')
   created_at = models.DateTimeField(auto_now_add=True)    # first time added
   updated_at = models.DateTimeField(auto_now=True)    # last update
   
   def __str__(self):
      return f"Id: {self.id}, UserId: {self.user_id}, Status: {self.status}"