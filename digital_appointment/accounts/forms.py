from django import forms
from .models import User


class LoginForm(forms.Form):
    username = forms.CharField(label = 'username or email', widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control'}))