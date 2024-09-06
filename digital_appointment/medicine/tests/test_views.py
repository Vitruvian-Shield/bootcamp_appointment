from http.client import responses

from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from medicine.models import *
from interaction.models import Comment
from accounts.models import User


class MedicineViewTest(APITestCase):
    def setUp(self):
        self.provider = reverse('provider')
        self.providerDetails = reverse('ProviderDetail', args=[2])
        self.service = reverse('Service')
        self.location_url = reverse('location')
        self.speciality = reverse('speciality')

        self.user = self.create_test_user(username='test', email='email@gmail.com', phone_number='1234567890')
        self.location = Location.objects.create(
            name='Sample Location',
            city='Sample City',
            state='Sample State',
            address='123 Sample Address',
            zip_code='12345'
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

    def test_post_provider(self):
        provider = {
            'user_id': self.user.id,
            'location_id': self.location.id,
            'speciality': 'psyco',
        }
        response = self.client.post(self.provider, data=provider, format='json',
                                    HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_provider(self):
        self.provider = Provider.objects.create(
            user_id=self.user.id,
            location_id=self.location.id,
            speciality='psyco',
        )
        """test get provier by speciality"""
        self.provider = reverse('provider') + '?speciality=psyco'
        response = self.client.get(self.provider, format='json',
                                   HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['speciality'], "psyco")
        """test get provider by location"""
        self.provider = reverse('provider') + '?location=Sample City'
        response = self.client.get(self.provider, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['location']['city'], "Sample City")
        """test get provider by high satisfaction"""
        self.provider = reverse('provider') + '?satisfaction=high'
        response = self.client.get(self.provider, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['stars_average'],
                         Provider.objects.order_by('-stars_average')[0].stars_average)
        """test get provider by low satisfaction"""
        self.provider = reverse('provider') + '?satisfaction=low'
        response = self.client.get(self.provider, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['stars_average'],
                         Provider.objects.order_by('stars_average')[0].stars_average)
        """test search provider by location , name , lastname and etc."""
        self.provider = reverse('provider') + '?query=John'
        response = self.client.get(self.provider, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['user']['first_name'], "John")
        """test provider pagination"""
        self.provider = reverse('provider')
        response = self.client.get(self.provider + '?limit=1', format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)  # Only one result per page
        self.assertIn('next', response.data)

    def test_provider_details(self):
        self.provider = Provider.objects.create(
            user_id=self.user.id,
            location_id=self.location.id,
            speciality='psyco',
        )
        self.providerDetails = reverse('ProviderDetail', args=[self.provider.id])
        response = self.client.get(self.providerDetails, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results']['provider']['speciality'], "psyco")
        self.assertEqual(response.data['results']['comments'],
                         list(Comment.objects.filter(provider_id=self.provider.id)))

