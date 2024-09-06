from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Rating, Provider

@receiver(post_save, sender=Rating)
def update_provider_average_rating(sender, instance, **kwargs):
    provider = instance.provider
    ratings = provider.rating_set.all()
    total_ratings = ratings.count()
    if total_ratings > 0:
        total_rating_sum = sum(r.rating for r in ratings)
        provider.average_rating = total_rating_sum / total_ratings
        provider.save()