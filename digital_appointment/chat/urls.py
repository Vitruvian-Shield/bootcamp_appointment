from django.urls import path
from .views import Comment, Rate

urlpatterns = [
        path("comment/<int:provider_id>/", Comment.as_view(), name="provider-comments"),
        path("rate/", Rate.as_view(), name="rate")
]
