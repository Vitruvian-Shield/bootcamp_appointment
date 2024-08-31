from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("login/code/", views.LoginCode.as_view()),
    path("login/accept/", views.Login.as_view()),
    path("login/refresh/", TokenRefreshView.as_view()),
    path("user/", views.User.as_view()),
    path("user/<int:pk>/", views.UserDetail.as_view()),
    path("profile/", views.ProfileView.as_view())
]
