from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from . import models, serializers
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404, render, redirect
from rest_framework import mixins
from rest_framework import generics
from django.contrib import messages
from accounts.models import User


class UserList(APIView, PageNumberPagination):
    template_name = 'accounts/user_list.html'

    def get(self, request):
        users = models.User.objects.all().order_by('created_at')
        page = self.paginate_queryset(users, request)
        serializer = serializers.UserSerializer(page, many=True)
        return render(request, self.template_name, {'users': users, 'serializer': serializer})

    # def post(self, request):
    #     serializer = serializers.UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.create(serializer.validated_data)  # serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegister(APIView):
    template_name = 'accounts/user_register.html'
    serializer_class = serializers.UserRegisterSerializer

    def get(self, request):
        if request.user.is_authenticated:
            return redirect('home')
        ser_data = self.serializer_class()
        return render(request, self.template_name, {'ser_data': ser_data})

    def post(self, request):
        ser_data = self.serializer_class(data=request.POST)
        if ser_data.is_valid():
            del ser_data.validated_data['password2']
            User.objects.create_user(
                username=ser_data.validated_data['username'],
                email=ser_data.validated_data['email'],
                password=ser_data.validated_data['password'],
                phone_number=ser_data.validated_data['phone_number'],
                first_name=ser_data.validated_data['first_name'],
                last_name=ser_data.validated_data['last_name'],
                birth_data=ser_data.validated_data['birth_data'],
            )  # serializer.save()
            messages.success(request, 'congratulations!, you registered successfully!', 'success')
            return redirect('accounts:register')
        return render(request, self.template_name, {'ser_data': ser_data})


class UserDetail(mixins.RetrieveModelMixin,
                 mixins.DestroyModelMixin,
                 mixins.UpdateModelMixin,
                 generics.GenericAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        user = models.User.objects.get(pk=request.user.id)
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)