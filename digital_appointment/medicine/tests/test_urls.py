from django.test import SimpleTestCase
from django.urls import reverse, resolve
from medicine import views


class TestUrls(SimpleTestCase):
    """this case set for medicine url
        and test every url
    """
    def test_provider_urls(self):
        url = reverse('provider')
        self.assertEqual(url, '/api/medicine/provider/')
        self.assertEqual(resolve(url).func.view_class, views.Provider)
    def test_speciality_urls(self):
        url = reverse('speciality')
        self.assertEqual(url, '/api/medicine/speciality/list/')
        self.assertEquals(resolve(url).func.view_class, views.SpecialtyListView)
    def test_locations_urls(self):
        url = reverse('location')
        self.assertEqual(url, '/api/medicine/locations/')
        self.assertEquals(resolve(url).func.view_class, views.Location)
    def test_provider_detail_url(self):
        url = reverse('ProviderDetail', args=[1])
        self.assertEqual(url, '/api/medicine/ProviderDetail/1/')
        self.assertEquals(resolve(url).func.view_class, views.ProviderDetail)
    def test_Service_urls(self):
        url = reverse('Service')
        self.assertEqual(url, '/api/medicine/Service/')
        self.assertEquals(resolve(url).func.view_class, views.Service)
