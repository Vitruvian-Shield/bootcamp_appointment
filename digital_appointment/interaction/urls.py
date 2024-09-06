from django.urls import path

from interaction import views

urlpatterns = [
    path('post_comment/', views.Comment.as_view(), name='post_comment'),
]