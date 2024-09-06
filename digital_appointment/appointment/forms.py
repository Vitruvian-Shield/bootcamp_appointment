from django import forms
from .models import AppointmentComment

class AppointmentCommentForm(forms.ModelForm):
    class Meta:
        model = AppointmentComment
        fields = ('comment',)
        widgets = {
            'comment': forms.Textarea(attrs={'rows': 4, 'cols': 40}),
        }