from django.db import models
from accounts.models import User
from medicine.models import Provider
class Comment(models.Model):
    """
    this model be used to store comments
    """
    """relational"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    """attributes"""
    comment = models.TextField()
    def __str__(self):
        return self.comment