from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Rate
from django.db.models import F

@receiver(pre_save, sender=Rate)
def adjust_rate_on_update(sender, instance, **kwargs):
    if instance.pk:
        old_instance = Rate.objects.get(pk=instance.pk)
        if instance.provider is not None:
            provider = instance.provider
            provider.rate_sum = F('rate_sum') - old_instance.score + instance.score
            provider.save()
        elif instance.comment is not None:
            comment = instance.comment
            comment.rate_sum = F('rate_sum') - old_instance.score + instance.score
            comment.save()

@receiver(post_save, sender=Rate)
def update_rate_on_create(sender, instance, created, **kwargs):
    if created:
        if instance.provider is not None:
            instance.provider.rate_sum = F('rate_sum') + instance.score
            instance.provider.rate_num = F('rate_num') + 1
            instance.provider.save()
        elif instance.comment is not None:
            instance.comment.rate_sum = F('rate_sum') + instance.score
            instance.comment.rate_num = F('rate_num') + 1
            instance.comment.save()

@receiver(post_delete, sender=Rate)
def update_rate_on_delete(sender, instance, **kwargs):
    if instance.provider is not None:
        instance.provider.rate_sum = F('rate_sum') - instance.score
        instance.provider.rate_num = F('rate_num') - 1
        instance.provider.save()
    elif instance.comment is not None:
        instance.comment.rate_sum = F('rate_sum') - instance.score
        instance.comment.rate_num = F('rate_num') - 1
        instance.comment.save()
