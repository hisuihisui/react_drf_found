from rest_framework import permissions


class ProfilePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # DBを更新屋削除するメソッド以外
        if request.method in permissions.SAFE_METHODS:
            return True
        return False
