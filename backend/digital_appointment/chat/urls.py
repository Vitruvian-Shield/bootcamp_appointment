from django.urls import path
from .views import Comment, Rate, Reply

urlpatterns = [
        path("comment/<int:provider_id>/", Comment.as_view(), name="provider-comments"),
        path("reply/<int:comment_id>/", Reply.as_view()),
        path("rate/", Rate.as_view(), name="rate")
]
