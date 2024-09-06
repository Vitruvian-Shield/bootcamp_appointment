from django.test import TestCase
from accounts.models import User
import datetime


class UserModelTest(TestCase):
    """model test for test creation and method of this object
    if this override or writing in first time"""

    """base setup ot test"""
    def setUp(self):
        self.user = User.objects.create(
            email='test@gmail.com',
            password='<PASSWOd123@>',
            username='test',
            phone_number='1234567890',
            birth_data=datetime.datetime.now(),
            first_name='Test',
            last_name='User',
        )
    """test creation"""
    def test_user_creation(self):
        self.assertEqual(self.user.email, 'test@gmail.com')
        self.assertEqual(self.user.username, 'test')
        self.assertEqual(self.user.phone_number, '1234567890')
    """password test"""
    def test_user_password_setter(self):
        self.assertFalse(self.user.set_password('<PASSWORD>'), '<PASSWOd123@>')
    """perm test"""
    def test_has_perm(self):
        self.assertTrue(not self.user.has_perm('accounts.change_email'))
    """module permission test"""
    def test_has_module_perm(self):
        self.assertTrue(self.user.has_module_perms('accounts'))
    """get full name test"""
    def test_get_full_name(self):
        self.assertEqual(self.user.get_full_name(), f'{self.user.first_name} {self.user.last_name}')
