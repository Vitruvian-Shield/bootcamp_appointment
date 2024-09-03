from . import models
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Comment
        fields = ["user","provider","comment","date"]


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reply
        fields = ['id', 'user', 'comment', 'text',  'created_at'] 


class CommentSerializerGET(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username")
    text = serializers.CharField()
    date = serializers.DateTimeField()
    replies = ReplySerializer(many=True)

    class Meta:
        model = models.Comment
        fields = ['id', 'user', 'text', 'date', 'replies']

    
    

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

    