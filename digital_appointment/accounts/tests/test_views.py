from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from accounts.models import User
import datetime

class GoogleAuthTests(APITestCase):

    def test_google_auth_init(self):
        url = reverse('google_auth')  # Use the related name you set in your url patterns
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('http', response.data)  # Check if the returned data contains a URL

    def test_google_callback_success(self):
        # Assume we already set a valid `code` value or mock the request to simulate it
        url = reverse('google_callback')  # Use the related name you set in your url patterns
        data = {
            'code': 'VALID_AUTH_CODE'
        }
        response = self.client.get(url, data=data, format='json')
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_400_BAD_REQUEST])


    def test_google_callback_no_code(self):
        url = reverse('google_callback')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
"""
we need better service for write this service

class SmsAuthTests(APITestCase):

    def test_sms_authentication(self):
        url = reverse('sms')  # Update as per your URL configuration
        data = {
            'mobile': '1234567890',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_verify_code_sms_authentication(self):
        url = reverse('sms-verify')  # Update as per your URL configuration
        data = {
            'code': 'VALID_CODE',
            'mobile': '1234567890',
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('tokens', response.data)
"""
class UserTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        """authentication access for test"""
        self.token = self.generate_jwt_token(self.user)

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def generate_jwt_token(self, user):
        """Generate a JWT token for the given user."""
        return RefreshToken.for_user(user).access_token

    def test_user_creation(self):
        url = reverse('user')  # Update as per your URL configuration
        data = {
            'username': 'updatedusername',
            'email': 'updated@example.com',
            'password': '<PASSWORd132@',
            'first_name': 'updatedfirst_name',
            'last_name': 'updatedlast_name',
            'phone_number': '1324567895',
            'birth_data': datetime.datetime.now(),
        }
        response = self.client.post(url, data, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_detail(self):
        url = reverse('user_detail', args=[self.user.id])  # Update as per your URL configuration
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)

    def test_user_update(self):
        url = reverse('user_detail', args=[self.user.id])  # Update as per your URL configuration
        data = {
            'username': 'updatedusername',
            'email': 'updated@example.com',
            'password': '<PASSWORd132@',
            'first_name': 'updatedfirst_name',
            'last_name': 'updatedlast_name',
            'phone_number': '1324567895',
            'birth_data': datetime.datetime.now(),
        }
        response = self.client.put(url, data, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_delete(self):
        url = reverse('user_detail', args=[self.user.id])  # Update as per your URL configuration
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)