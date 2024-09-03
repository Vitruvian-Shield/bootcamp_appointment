from . import models
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Comment
        fields = ["user","provider","comment","date"]
   
class CommentSerializerGET(CommentSerializer):
    user = serializers.CharField(source="user.username")
    
    

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rate
        fields = "__all__"
    
    def create(self, validated_data):
        score = validated_data.pop('score')
        
        rate, created = models.Rate.objects.update_or_create(
            defaults={'score': score},
            **validated_data
        )
        
        return rate