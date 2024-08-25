from django.db import models


class Appointment(models.Model):
    """ a class that represent appointment itself """
    STATUS = (
        (0, "scheduled"),
        (1, "cancelled"),
        (2, "completed"),
    )

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    provider = models.ForeignKey('medicine.Provider', on_delete=models.CASCADE)
    service = models.ForeignKey('medicine.Service', on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.SmallIntegerField(choices=STATUS, default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.date)

    class Meta:
        db_table = "appointment"
