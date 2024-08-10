from django.db import models
from medicine.models import Provider, Location, Service, User, BaseModel

# Create your models here.


class Appointment(BaseModel):
    class Status(models.TextChoices):
        SCHEDULED = "sch", 'scheduled'
        CANCELED = "can", 'canceled'
        COMPLETED = "com", 'completed'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=4, choices=Status.choices)

    def __str__(self):
        return f"{self.user} - {self.provider} - {self.appointment_date}"
