from django.shortcuts import render
from . import models
from django.http import JsonResponse


def get_users(request):
    if request.method == "GET":

        user = models.User.objects.get(username="ali")
        user.delete()

        users = models.User.objects.all().order_by("-id")
        users = [
            {
                "first_name": obj.first_name,
                "last_name": obj.last_name,
                "username": obj.username
            } for obj in users
        ]
        print(users)

        return JsonResponse(users, safe=False)
    elif request.method == "POST":
        pass
