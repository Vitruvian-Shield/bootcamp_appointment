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
    provider = serializers.PrimaryKeyRelatedField(
        queryset=Provider.objects.all(),
        required=False,
        allow_null=True
    )
    comment = serializers.PrimaryKeyRelatedField(
        queryset=models.Comment.objects.all(),
        required=False,
        allow_null=True
    )
    reply = serializers.PrimaryKeyRelatedField(
        queryset=models.Reply.objects.all(),
        required=False,
        allow_null=True
    )
    score = serializers.ChoiceField(choices=[(1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5")])

    class Meta:
        model = models.Rate
        fields = ['provider', 'comment', 'reply', 'score', 'user']

    def validate(self, data):
        if not any([data.get("provider"), data.get("comment"), data.get("reply")]):
            raise serializers.ValidationError("You must provide a provider, comment, or reply.")

        return data

    def create(self, validated_data):
        user = validated_data.pop('user')
        provider = validated_data.pop('provider', None)
        comment = validated_data.pop('comment', None)
        reply = validated_data.pop('reply', None)
        score = validated_data.pop('score')

        
        lookup_fields = {'user': user}
        if provider:
            lookup_fields['provider'] = provider
        if comment:
            lookup_fields['comment'] = comment
        if reply:
            lookup_fields['reply'] = reply

        
        rate, created = models.Rate.objects.update_or_create(
            **lookup_fields,
            defaults={'score': score}
        )
        return rate