from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Rate
from django.db.models import F

@receiver(pre_save, sender=Rate)
def store_original_score(sender, instance, **kwargs):
    if instance.pk:
        try:
            instance._original_score = Rate.objects.get(pk=instance.pk).score
        except Rate.DoesNotExist:
            instance._original_score = None
    else:
        instance._original_score = None

@receiver(post_save, sender=Rate)
def update_rate_sums(sender, instance, created, **kwargs):
    if created:
        # Handle creation
        if instance.provider:
            instance.provider.rate_sum = F('rate_sum') + instance.score
            instance.provider.rate_num = F('rate_num') + 1
            instance.provider.save()
        elif instance.comment:
            instance.comment.rate_sum = F('rate_sum') + instance.score
            instance.comment.rate_num = F('rate_num') + 1
            instance.comment.save()
        elif instance.reply:
            instance.reply.rate_sum = F('rate_sum') + instance.score
            instance.reply.rate_num = F('rate_num') + 1
            instance.reply.save()
    else:
        # Handle update
        if instance._original_score is not None:
            if instance.provider:
                instance.provider.rate_sum = F('rate_sum') - instance._original_score + instance.score
                instance.provider.save()
            elif instance.comment:
                instance.comment.rate_sum = F('rate_sum') - instance._original_score + instance.score
                instance.comment.save()
            elif instance.reply:
                instance.reply.rate_sum = F('rate_sum') - instance._original_score + instance.score
                instance.reply.save()

@receiver(post_delete, sender=Rate)
def update_rate_on_delete(sender, instance, **kwargs):
    if instance.provider:
        instance.provider.rate_sum = F('rate_sum') - instance.score
        instance.provider.rate_num = F('rate_num') - 1
        instance.provider.save()
    elif instance.comment:
        instance.comment.rate_sum = F('rate_sum') - instance.score
        instance.comment.rate_num = F('rate_num') - 1
        instance.comment.save()
    elif instance.reply:
        instance.reply.rate_sum = F('rate_sum') - instance.score
        instance.reply.rate_num = F('rate_num') - 1
        