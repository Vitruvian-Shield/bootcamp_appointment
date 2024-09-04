from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from . import models, serializers
from medicine.models import Provider

class Comment(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, provider_id=None):
        if provider_id is None:
            return Response({"detail": "Provider ID is required."}, status=400)

        comments = models.Comment.objects.filter(provider=provider_id).reverse()
        serializer = serializers.CommentSerializerGET(comments, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    def post(self, request, provider_id=None):
        if provider_id is None:
            return Response({"detail": "Provider ID is required."}, status=400)
                
        data = request.data.copy()
        data["provider"] = provider_id
        data["user"] = request.user.id
        print(request.data)
        serializer = serializers.CommentSerializer(data=data)
        if serializer.is_valid():
            print("valid")
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class Rate(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    

    
    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id
        score =  data.pop("score")
        if not any([data.get("provider"), data.get("comment"), data.get("reply")]) and not score:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        print("that")
        rate, created = models.Rate.objects.update_or_create(
            **data,
            defaults={
                'score': score,
                
            },
        )
        return Response(status=status.HTTP_200_OK)
class Reply(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, comment_id):
        request.data._mutable = True
        
        request.data["user"] = request.user.id
        request.data["comment"] = comment_id
        serializer = serializers.ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


