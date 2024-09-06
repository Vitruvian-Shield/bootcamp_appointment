from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from interaction.models import *
from medicine.models import Provider, Location
from accounts.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class InteractionViewsTestCase(APITestCase):
    """Tests for the Comment interaction views."""

    model = Comment

    def setUp(self):
        """Set up test variables and test database state."""

        """specific url """
        self.comment_post_url = reverse('post_comment')

        self.user = self.create_test_user(username='test', email='email@gmail.com', phone_number='1234567890')
        self.user2 = self.create_test_user(username='test2', email='test2@gmail.com', phone_number='1234567899')

        self.location = Location.objects.create(
            name='Sample Location',
            city='Sample City',
            state='Sample State',
            address='123 Sample Address',
            zip_code='12345'
        )

        self.provider = Provider.objects.create(
            speciality='General',
            user=self.user2,
            location=self.location
        )
        """authentication access for test"""
        self.token = self.generate_jwt_token(self.user)

    def create_test_user(self, username, email, phone_number):
        """Helper method to create a test user."""
        return User.objects.create(
            username=username,
            password='PASSWORd123@',
            email=email,
            phone_number=phone_number,
            first_name='John',
            last_name='Doe'
        )

    def generate_jwt_token(self, user):
        """Generate a JWT token for the given user."""
        return RefreshToken.for_user(user).access_token

    def test_post_comment(self):
        """Test posting a comment successfully."""
        comment_data = {
            'comment': 'This is a test comment.',
            'stars': 4,
            'provider_id': self.provider.id,
            'user_id': self.user.id
        }

        response = self.client.post(
            self.comment_post_url,
            comment_data,
            format='json',
            HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.model.objects.filter(**comment_data).count(), 1)
        self.assertEqual(self.model.objects.latest('-id').comment, 'This is a test comment.')
