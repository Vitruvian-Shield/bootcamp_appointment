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
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.comment


"""
we can stored the OnlineCounseling in database 
for manage the count of Counseling of patient 
with According to the included policy of site
"""
"""
class OnlineCounseling(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    def __str__(self):
        return f"{self.user} on {self.date}"
"""
