from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("login/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", views.LogOutViewWithToken.as_view(), name="logout"),
    path("user/", views.User.as_view(), name="user"),
    path("user/<int:pk>/", views.UserDetail.as_view(), name="user_detail"),
    path("profile/", views.ProfileView.as_view(), name="profile"),
    path('auth/google/start/', views.GoogleAuthInit.as_view(), name='google_auth'),
    path('auth/google/callback/', views.GoogleCallback.as_view(), name='google_callback'),
    path('auth/sms/', views.SmsAuthentication.as_view(), name='sms'),
    path('auth/sms/verify/', views.VerifyCodeSmsAuthentication.as_view(), name='sms-verify'),
]
