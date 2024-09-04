from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("login/", views.CustomTokenObtainPairView.as_view()),
    path("login/refresh/", TokenRefreshView.as_view()),
    path("user/", views.User.as_view()),
    path("user/<int:pk>/", views.UserDetail.as_view()),
    path("profile/", views.ProfileView.as_view()),
    path('auth/google/start/', views.GoogleAuthInit.as_view(), name='google_callback'),
    path('auth/google/callback/', views.GoogleCallback.as_view(), name='google_callback'),
    path('sms/', views.SmsAuthentication.as_view(), name='sms'),
    path('sms/verify', views.VerifyCodeSmsAuthentication.as_view(), name='sms'),
]
