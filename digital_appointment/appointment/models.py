from django.db import models


class AppointmentModel(models.Model):
    """ a table for save appointment datas """
    class Status(models.TextChoices):
        SCHEDULED = ('0', 'Scheduled')
        CANCELLED = ('1', 'Cancelled')
        COMPLETE = ('2', 'Complete')

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    doctor = models.ForeignKey('medicine.DoctorsModel', on_delete=models.CASCADE)
    service = models.ForeignKey('medicine.ServiceModel', on_delete=models.CASCADE)
    patient_first_name = models.CharField(max_length=255)
    patient_last_name = models.CharField(max_length=255)
    patient_phone_number = models.CharField(max_length=20)
    patient_national_id = models.CharField(max_length=20)
    patient_gender = models.CharField(max_length=10)
    date = models.DateTimeField()
    status = models.SmallIntegerField(choices=Status, default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.date

    class Meta:
        db_table = "appointment"


class CommentsModel(models.Model):
    """ a table for saving comments in profile page """

    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    doctor = models.ForeignKey("medicine.DoctorsModel", on_delete=models.CASCADE)
    rate = models.SmallIntegerField()
    comment = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.user
