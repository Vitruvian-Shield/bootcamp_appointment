from .models import ConfirmCode
from django.dispatch import receiver
from django.db.models.signals import post_save

@receiver(post_save, sender=ConfirmCode)
def  send_code(sender, instance, created, **kwargs):
    if created:
        # you can use any library or service to send SMS
        print(instance.code)
        
        
