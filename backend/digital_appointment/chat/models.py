from django.db import models

class Comment(models.Model):
    provider = models.ForeignKey("medicine.Provider",on_delete=models.CASCADE,related_name='comments')
    user = models.ForeignKey('accounts.User',on_delete=models.CASCADE,related_name='user_comments')
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    update = models.BooleanField(default=False)
    rate_sum = models.PositiveIntegerField(default=0)
    rate_num = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ['date']
        
    def __str__(self):
        return 'Comment {} by {}'.format(self.text, self.user)
    
class Rate(models.Model):
    provider = models.ForeignKey("medicine.Provider", on_delete=models.CASCADE, related_name="rates", null=True, blank=True)
    comment = models.ForeignKey("chat.Comment", on_delete=models.CASCADE, related_name="commet_rates", null=True, blank=True)
    reply = models.ForeignKey("chat.Reply", on_delete=models.CASCADE, related_name="reply_rates", null=True, blank=True)
    score = models.PositiveSmallIntegerField(choices=[(1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5")])
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "rate"
        constraints = [
            models.UniqueConstraint(fields=["provider", "user"], name="unique_rate"),
            models.UniqueConstraint(fields=["comment", "user"], name="unique_comment_rate"),
            models.UniqueConstraint(fields=["reply", "user"], name="unique_reply_rate")
        ]
class Reply(models.Model):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    comment =models.ForeignKey("chat.Comment", on_delete=models.CASCADE, related_name="replies")
    text = models.TextField()
    rate_sum = models.PositiveIntegerField(default=0)
    rate_num = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = "reply"
    
    