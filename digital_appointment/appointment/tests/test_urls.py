from django.test import SimpleTestCase
from django.urls import reverse, resolve
from appointment import views


class UrlsTests(SimpleTestCase):
    """this case testing the appointment all action
    in view as post get put delete and retrieve"""

    """post and get method test"""

    def test__urls_appointment(self):
        url = reverse('appointment')
        self.assertEqual(url, '/api/appointment/appointment/')
        self.assertEqual(resolve(url).func.view_class, views.AppointmentView)

    """put delete and retrieve method test"""

    def test__urls_appointment_detail(self):
        url = reverse('appointmentDetail', args=[1])
        self.assertEqual(url, '/api/appointment/appointment/1')
        self.assertEqual(resolve(url).func.view_class, views.AppointmentDetailView, )
