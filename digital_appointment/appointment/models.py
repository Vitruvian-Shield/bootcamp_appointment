from django.db import models
from accounts.models import User
from medicine.models import DoctorsModel, ServiceModel


class AppointmentModel(models.Model):
    """ a table for save appointment datas """
    class Status(models.TextChoices):
        SCHEDULED = ('0', 'Scheduled')
        CANCELLED = ('1', 'Cancelled')
        COMPLETE = ('2', 'Complete')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor = models.ForeignKey(DoctorsModel, on_delete=models.CASCADE)
    service = models.ForeignKey(ServiceModel, on_delete=models.CASCADE)
    patient_first_name = models.CharField(max_length=255)
    patient_last_name = models.CharField(max_length=255)
    patient_phone_number = models.CharField(max_length=20)
    patient_national_id = models.CharField(max_length=20)
    patient_gender = models.CharField(max_length=10)
    date = models.DateTimeField()
    status = models.CharField(max_length=2,choices=Status.choices, default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.patient_first_name

    class Meta:
        db_table = "appointment"


class CommentsModel(models.Model):
    """ a table for saving comments in profile page """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor = models.ForeignKey(DoctorsModel, on_delete=models.CASCADE)
    rate = models.SmallIntegerField()
    comment = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.comment
