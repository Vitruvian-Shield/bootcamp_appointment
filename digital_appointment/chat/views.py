from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from . import models, serializers

class Comment(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, provider_id=None):
        if provider_id is None:
            return Response({"detail": "Provider ID is required."}, status=400)

        comments = models.Comment.objects.filter(provider=provider_id).order_by('-date')
        serializer = serializers.CommentSerializerGET(comments, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    def post(self, request, provider_id=None):
        if provider_id is None:
            return Response({"detail": "Provider ID is required."}, status=400)
        request.data["provider"] = provider_id
        request.data["user"] = request.user.id
        print(request.data)
        serializer = serializers.CommentSerializer(data=request.data)
        if serializer.is_valid():
            print("valid")
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

