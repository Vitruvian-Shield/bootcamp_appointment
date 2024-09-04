from . import models
from rest_framework import serializers
from medicine.models import Provider
class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Comment
        fields = ["id", "user","provider","text","date"]


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reply
        fields = ['id', 'user', 'comment', 'text', "rate_sum", "rate_num",  'created_at'] 


class CommentSerializerGET(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username")
    text = serializers.CharField()
    date = serializers.DateTimeField()
    replies = ReplySerializer(many=True)

    class Meta:
        model = models.Comment
        fields = ['id', 'user', 'text', 'date', "rate_num", "rate_sum", 'replies']

    
    

class RateSerializer(serializers.ModelSerializer):
    comment = serializers.PrimaryKeyRelatedField(
        queryset=models.Comment.objects.all(), required=False, allow_null=True
    )
    reply = serializers.PrimaryKeyRelatedField(
        queryset=models.Reply.objects.all(), required=False, allow_null=True
    )
    provider = serializers.PrimaryKeyRelatedField(
        queryset=Provider.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = models.Rate
        fields = "__all__"
    
