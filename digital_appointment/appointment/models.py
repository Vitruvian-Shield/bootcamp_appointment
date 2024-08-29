from django.db import models


class Appointment(models.Model):
    STATUS = (
        (0, "scheduled"),
        (1, "cancelled"),
        (2, "completed"),
    )

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    provider = models.ForeignKey('medicine.Provider', on_delete=models.CASCADE)
    service = models.ForeignKey('medicine.Service', on_delete=models.CASCADE)
    patient_first_name = models.CharField(max_length=255, default="firstname")
    patient_last_name = models.CharField(max_length=255, default="lastname")
    patient_phone_number = models.CharField(max_length=20, default="1")
    patient_national_id = models.CharField(max_length=20, default="1")
    patient_gender = models.CharField(max_length=10, default="gender")
    date = models.DateTimeField()
    status = models.SmallIntegerField(choices=STATUS, default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.date}"

    class Meta:
        db_table = "appointment"
