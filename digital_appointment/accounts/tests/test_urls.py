from django.test import SimpleTestCase
from django.urls import reverse, resolve
from accounts import views
from rest_framework_simplejwt.views import TokenRefreshView

class AccountsTestCase(SimpleTestCase):
    def test_login_url(self):
        url = reverse('token_obtain_pair')
        self.assertEqual(url, '/api/accounts/login/')
        self.assertEqual(resolve(url).func.view_class, views.CustomTokenObtainPairView)

    def test_login_refresh_url(self):
        url = reverse('token_refresh')
        self.assertEqual(url, '/api/accounts/login/refresh/')
        self.assertEqual(resolve(url).func.view_class, TokenRefreshView)

    def test_logout_url(self):
        url = reverse('logout')
        self.assertEqual(url, '/api/accounts/logout/')
        self.assertEqual(resolve(url).func.view_class, views.LogOutViewWithToken)

    def test_user_url(self):
        url = reverse('user')
        self.assertEqual(url, '/api/accounts/user/')
        self.assertEqual(resolve(url).func.view_class, views.User)

    def test_user_detail_url(self):
        url = reverse('user_detail',args=[1])
        self.assertEqual(url, '/api/accounts/user/1/')
        self.assertEqual(resolve(url).func.view_class, views.UserDetail)

    def test_auth_google_url(self):
        url = reverse('google_auth')
        self.assertEqual(url, '/api/accounts/auth/google/start/')
        self.assertEqual(resolve(url).func.view_class, views.GoogleAuthInit)

    def test_auth_google_callback_url(self):
        url = reverse('google_callback')
        self.assertEqual(url, '/api/accounts/auth/google/callback/')
        self.assertEqual(resolve(url).func.view_class, views.GoogleCallback)

    def test_auth_sms_url(self):
        url = reverse('sms')
        self.assertEqual(url, '/api/accounts/auth/sms/')
        self.assertEqual(resolve(url).func.view_class, views.SmsAuthentication)
    def test_auth_sms_verify_url(self):
        url = reverse('sms-verify')
        self.assertEqual(url, '/api/accounts/auth/sms/verify/')
        self.assertEqual(resolve(url).func.view_class, views.VerifyCodeSmsAuthentication)


