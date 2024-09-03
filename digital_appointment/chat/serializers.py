from . import models
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Comment
        fields = ["user","provider","comment","date"]
   
class CommentSerializerGET(CommentSerializer):
    user = serializers.CharField(source="user.username")