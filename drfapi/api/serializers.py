from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")
        # パスワードを読み取りのみで入力必須へ
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_date):
        # パスワードをハッシュ化して登録
        user = User.objects.create_user(**validated_date)
        Token.objects.create(user=user)
        return user


class TaskSerializer(serializers.ModelSerializer):
    # 日付はreadonly
    # getで情報はとれるが、postで指定する必要はない
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True
    )
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True
    )

    class Meta:
        model = Task
        fields = ["id", "title", "created_at", "updated_at"]
