from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


app_name = 'accounts'
urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path("user/", views.UserList.as_view(), name="user_list"),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path("user/<int:pk>/", views.UserDetail.as_view(), name='user_detail'),
    path('profile/', views.ProfileView.as_view(), name='user_profile'),
]