from django.db import models
from django.contrib.auth.models import AbstractBaseUser
import random
from . import managers


class User(AbstractBaseUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=200, unique=True)
    phone_number = models.CharField(max_length=20, unique=True)
    birth_data = models.DateTimeField(null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    update_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expire_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ["phone_number", "email", "first_name", "last_name"]
    objects = managers.UserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"



def myRandom():
    return str(random.randrange(10000000,99999999))

class ConfirmCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='confirm_code')
    code = models.CharField(max_length=8, default=myRandom)
    update_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'confirm_code'
    
    @classmethod
    def get_code(cls, user):
        return cls.objects.filter(user=user).latest('created_at').code
    