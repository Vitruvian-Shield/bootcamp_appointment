from django.db import models

class Comment(models.Model):
    provider = models.ForeignKey("medicine.Provider",on_delete=models.CASCADE,related_name='comments')
    user = models.ForeignKey('accounts.User',on_delete=models.CASCADE,related_name='user_comments')
    comment = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    update = models.BooleanField(default=False)

    class Meta:
        ordering = ['date']


    def __str__(self):
        return 'Comment {} by {}'.format(self.comment, self.user)