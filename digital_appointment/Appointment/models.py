from django.db import models
from ..accounts.models import User
from ..medicine.models import ProviderModel, ServicesModel


class AppointmentModel(models.Model):
    """Appointment Table"""

    class StatusChoices(models.TextChoices):
        """Choices for Client's Status"""

        SCHEDULED = 'Sch', 'Scheduled'
        COMPLETED = 'Cmp', 'Completed'
        CANCELED = 'Cnd', 'Canceled'

    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_id')
    provider_id = models.ForeignKey(ProviderModel, on_delete=models.CASCADE, related_name="provider_id")
    service_id = models.ForeignKey(ServicesModel, on_delete=models.CASCADE, related_name="services_id")
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=3, choices=StatusChoices.choices, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
