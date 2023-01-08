from django.urls import path, include
from . import views
from .views import UserViewSet,RideViewSet,RequestsViewSet
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token



router = DefaultRouter()
router.register('rides', RideViewSet, basename='RideViewSet')
router.register('rides', RideViewSet, basename='RideViewSet')
router.register('users', UserViewSet, basename='UserViewSet')
router.register('requests', RequestsViewSet, basename='requests')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', obtain_auth_token),
    # path('rides/post/',RideViewSet.as_view({"post": "follow"}))
    


]