from django.urls import path
from django.conf.urls import include
from rest_framework import routers

from api.views import TaskViewSet, UserViewSet, ManageUserView


router = routers.DefaultRouter()
router.register("tasks", TaskViewSet)
router.register("users", UserViewSet)

urlpatterns = [
    # genericを継承しているため、as_View()を使用している
    path("myself/", ManageUserView.as_view(), name='myself'),
    path("", include(router.urls)),
]
