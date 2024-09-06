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
        score = data.pop("score")

        # Validate if the necessary fields are provided
        if not any([data.get("provider"), data.get("comment"), data.get("reply")]) or not score:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Initialize variables to hold model instances
        provider = comment = reply = None

        try:
            # Fetch the instances if IDs are provided
            if data.get("provider"):
                provider = Provider.objects.get(pk=data["provider"])
            if data.get("comment"):
                comment = models.Comment.objects.get(pk=data["comment"])
            if data.get("reply"):
                reply = models.Reply.objects.get(pk=data["reply"])

            # Prepare the fields for update_or_create
            lookup_fields = {'user': request.user}
            if provider:
                lookup_fields['provider'] = provider
            if comment:
                lookup_fields['comment'] = comment
            if reply:
                lookup_fields['reply'] = reply

            # Update or create the Rate object
            rate, created = models.Rate.objects.update_or_create(
                **lookup_fields,  # Use only the provided lookup fields
                defaults={
                    'score': int(score)
                },
            )

            return Response(status=status.HTTP_200_OK)

        except Provider.DoesNotExist:
            return Response({"error": "Provider does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        except models.Comment.DoesNotExist:
            return Response({"error": "Comment does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        except models.Reply.DoesNotExist:
            return Response({"error": "Reply does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "Invalid score value."}, status=status.HTTP_400_BAD_REQUEST)

    

        
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


