# from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import viewsets

from .models import Task
from .serializers import TaskSerializer, UserSerializer
from .ownpermissions import ProfilePermission


# Create your views here.
# viewsets.ModelViewSet : CRUDが標準で使用可能
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # viewのpermissionを設定
    permission_classes = (ProfilePermission,)


# myself用のView
# ログインしたユーザの取得、更新
class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    # ログイン済みのユーザのみ許可
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        # ログインしているユーザ情報を返す
        return self.request.user


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # ログイン済みのユーザのみ許可
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
