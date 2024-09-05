from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("login/", views.CustomTokenObtainPairView.as_view()),
    path("login/refresh/", TokenRefreshView.as_view()),
    path("user/", views.User.as_view()),
    path("user/<int:pk>/", views.UserDetail.as_view()),
    path("profile/", views.ProfileView.as_view()),
    path('send-code/', views.SendCodeView.as_view(), name='send-code'),
    path('loginWithPhone/', views.LoginView.as_view(), name='login')
]
