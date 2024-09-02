from django.db import models


class ContactUsModel(models.Model):
    """contact us model: save the users criticisms and suggestions"""

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=11)
    email = models.EmailField(max_length=100)
    comment = models.TextField()

    def __str__(self):
        return self.first_name

    class Meta:
        db_table = "ContactUs"
