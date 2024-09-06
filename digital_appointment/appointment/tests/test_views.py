from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from appointment.models import Appointment
from accounts.models import User
from medicine.models import *
from rest_framework_simplejwt.tokens import RefreshToken
import datetime


class AppointmentViewTestCase(APITestCase):
    model = Appointment

    def setUp(self):
        """Set up test variables and test database state."""

        """specific url """
        self.appointment_url = reverse('appointment')
        self.appointmentDetail_url = reverse('appointmentDetail', args=[1])
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
        self.service = Service.objects.create(
            name='Sample Service',
            price=2500.25,
            description='Sample Description',
            duration=5

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

    def test_get_appointments(self):
        response = self.client.get(self.appointment_url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], Appointment.objects.count())

    def test_get_appointment_by_id(self):
        self.appointment = Appointment.objects.create(
            provider=self.provider,
            service=self.service,
            user=self.user,
            patient_gender='test',
            patient_first_name='test',
            patient_last_name='test',
            patient_national_id='123467789',
            patient_phone_number='1234567890',
            status=0,
            date=datetime.datetime.now()
        )
        response = self.client.get(self.appointmentDetail_url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], Appointment.objects.first().id)

    def test_create_appointment(self):
        appointment1 = {
            'patient_first_name': 'test',
            'patient_last_name': 'test',
            'patient_national_id': '123467789',
            'patient_phone_number': '1234567890',
            'patient_gender': 'test',
            'date': datetime.datetime.now(),
            'status': 0,
            'provider_id': self.provider.id,
            'service_id': self.service.id,
            'user_id': self.user.id,
        }
        response = self.client.post(self.appointment_url, appointment1,
                                    format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['id'], Appointment.objects.first().id)
        self.assertEqual(response.data['patient_gender'], Appointment.objects.first().patient_gender)

    def test_update_appointment(self):
        appointment2 = {
            'patient_first_name': 'test',
            'patient_last_name': 'test',
            'patient_national_id': '123467789',
            'patient_phone_number': '1234567890',
            'patient_gender': 'test',
            'date': datetime.datetime.now(),
            'status': 0,
            'provider_id': self.provider.id,
            'service_id': self.service.id,
            'user_id': self.user.id,
        }
        response = self.client.put(self.appointmentDetail_url, appointment2, HTTP_AUTHORIZATION=f'Bearer {self.token}',
                                   format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], Appointment.objects.first().id)
        self.assertEqual(response.data['patient_gender'], Appointment.objects.first().patient_gender)
    def test_delete_appointment(self):
        self.appointment = Appointment.objects.create(
            provider=self.provider,
            service=self.service,
            user=self.user,
            patient_gender='test',
            patient_first_name='test',
            patient_last_name='test',
            patient_national_id='123467789',
            patient_phone_number='1234567890',
            status=0,
            date=datetime.datetime.now()
        )
        response = self.client.delete(self.appointmentDetail_url, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)