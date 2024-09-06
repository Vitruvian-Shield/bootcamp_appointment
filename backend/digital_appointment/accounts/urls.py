from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("login/code/", views.LoginCode.as_view()),
    path("login/accept/", views.Login.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("userSignin/", views.User.as_view()),
    path("profile/", views.UserDetail.as_view()),
    path("usernameisavalable/<str:username>/", views.UserNameIsAvalable.as_view()),
    path("emailisavalable/<str:email>/", views.EmailIsAvalable.as_view())
]
