from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from .models import Rate
from django.db.models import F
from django.db import transaction

@receiver(pre_save, sender=Rate)
def store_original_score(sender, instance, **kwargs):
    print("pre save")
    try:
        if instance.pk:
            try:
                instance._original_score = Rate.objects.get(pk=instance.pk).score
            except Rate.DoesNotExist:
                instance._original_score = None
        else:
            instance._original_score = 0
    except:
        pass

@receiver(post_save, sender=Rate)
def update_rate_sums(sender, instance, created, **kwargs):
    try:
        with transaction.atomic():
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
    except Exception as e:
        # Handle IntegrityError (or other exceptions) here
        print(f"IntegrityError occurred: {e}")
        # Optionally, rollback the transaction or handle the error as needed
@receiver(post_delete, sender=Rate)
def update_rate_on_delete(sender, instance, **kwargs):
    try:
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
    except Exception as e:
        print(e)       