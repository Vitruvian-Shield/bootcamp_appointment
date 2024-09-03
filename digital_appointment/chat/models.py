from django.db import models

class Comment(models.Model):
    provider = models.ForeignKey("medicine.Provider",on_delete=models.CASCADE,related_name='comments')
    user = models.ForeignKey('accounts.User',on_delete=models.CASCADE,related_name='user_comments')
    comment = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    update = models.BooleanField(default=False)
    rate_sum = models.PositiveIntegerField(default=0)
    rate_num = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ['date']
        
    def __str__(self):
        return 'Comment {} by {}'.format(self.comment, self.user)
    
class Rate(models.Model):
    provider = models.ForeignKey("medicine.Provider", on_delete=models.CASCADE, related_name="rates", null=True)
    comment = models.ForeignKey("chat.Comment", on_delete=models.CASCADE, related_name="commet_rates", null=True)
    score = models.PositiveSmallIntegerField(choices=[(1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5")])
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "rate"
        constraint = [
            models.UniqueConstraint(fields=["provider", "user"], name="unique_rate"),
            models.UniqueConstraint(fields=["comment", "user"], name="unique_comment_rate")
        ]

    