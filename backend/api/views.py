from rest_framework import viewsets
from wesPool.models import Ride,Requests
from .serializers import UserSerializer,RideSerializer,RequestsSerializer

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS, DjangoModelPermissionsOrAnonReadOnly
from django.contrib.auth.models import User
from rest_framework import filters
from rest_framework.permissions import AllowAny
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, OAuth2Authentication
from oauth2_provider.models import AccessToken
from rest_framework.decorators import action

# Create your views here.
class PostReviewWritePermission(BasePermission):
    message = "Editing posts is restricted to the author only"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        try:
            user = AccessToken.objects.get(token=request.data['access_token'])
            return True
        except:
            print('not logged in')
            return False
        return obj.host == user.user


class RideViewSet(viewsets.ModelViewSet):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [TokenHasReadWriteScope]
    # filter_fields = (
    #     'src',
    #     'dst',
    #     'date_time'
    # )

    # def perform_create(self, serializer,request):
    #     # here you will send `created_by` in the `validated_data` 
    #     user = AccessToken.objects.get(token=request.data['access_token'])
    #     serializer.save(
    #         date_time=self.request.data.date,
    #         src=self.request.data.src,
    #         dst=self.request.data.dst,
    #         seats=self.request.data.seats,
    #         price=self.request.data.price,
    #         uber=self.request.data.uber,
    #         host=user,
    #         group=self.request.data.group
    #     )
    def create(self, request, *args, **kwargs):
        user = AccessToken.objects.get(token=request.META['HTTP_AUTHORIZATION'][7:]).user
        del request.data['host']
        request.data['host'] = user.id
        print(request.data,'HI AGAIN')
        return super().create(request)
        



class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RequestsViewSet(viewsets.ModelViewSet, PostReviewWritePermission):
    queryset = Requests.objects.all()
    serializer_class = RequestsSerializer
    permission_classes = [TokenHasReadWriteScope]
    filter_fields = (
        'req_by',
        'req_to'
    )