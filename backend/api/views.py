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
from django.db.models import Q
from functools import reduce 
from rest_framework import status
from rest_framework.response import Response
from wesPool.models import Ride, Requests




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
    # queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [TokenHasReadWriteScope]
    filter_fields = (
        'src',
        'dst',
        'date_time'
    )


    # def list(self, request):
    #     serializer = ItemSerializer(self.queryset, many=True)
    #     return Response(serializer.data)

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
        del request.data['group']
        request.data['host'] = user.id
        request.data['group'] = [user.id]
        print(request.data,'HI AGAIN')
        return super().create(request)
    
    def get_queryset(self, *args, **kwargs):
        print('hello?',self.request.query_params)
        user = AccessToken.objects.get(token=self.request.META['HTTP_AUTHORIZATION'][7:]).user
        if len(self.request.query_params)==0:
            data = Ride.objects.all()
            return data
        res = []
        res2 = []
        for key in self.request.query_params:
            try:
                if key == "host":
                    res = Ride.objects.filter(host=user)
                if key == "group":
                    res2 = Ride.objects.filter(group__in=[user.id]).exclude(host=user)
            except:
                print('oops')
        final = res | res2
        return final.distinct()

    def get(self, *args, **kwargs):
        print('wa')
    
    def update(self, request, *args, **kwargs):
        user = AccessToken.objects.get(token=request.META['HTTP_AUTHORIZATION'][7:]).user
        ride = Ride.objects.get(id=self.request.data['id'])
        if len(self.request.data)==2:
            print('helllllllooooo')
            user = User.objects.get(id=self.request.data['req_by'])

            # new_lst = []
            for user_d in ride.group.all():
                if user==user_d:
                    return Response({},status.HTTP_204_NO_CONTENT)
            # new_lst.append(user)
            ride.group.add(user)
            # ride.save(update_fields=['group'])
            print(ride.get_fields())
            return Response({}, status.HTTP_204_NO_CONTENT)



        host = ride.host
        old_ride = ride.get_fields()
        if user == old_ride['host']:
            for key in old_ride:
                if key == 'date_time':
                    continue
                if key=='id' or key=='host':
                    continue
                if key=='group':
                    if old_ride['group']!=self.request.data['group']:
                        print('hi')
                if self.request.data[key]!=old_ride[key]:
                    if key=="src":
                        ride.src = self.request.data[key]
                    elif key=="dst":
                        ride.dst = self.request.data[key]
                    elif key =="uber":
                        ride.uber = self.request.data[key]
                    elif key=="group":
                        ride.group = self.request.data[key]
                    elif key=="seats":
                        ride.seats = self.request.data[key]
                    elif key=="price":
                        ride.price = self.request.data[key]
                    ride.save(update_fields=[key])
        else:
            print('NOOOO')

        return Response({}, status.HTTP_204_NO_CONTENT)

    def destroy(self, request, *args, **kwargs):
        user = AccessToken.objects.get(token=request.META['HTTP_AUTHORIZATION'][7:]).user
        print(self.request.data,"????")
        ride = Ride.objects.get(id=self.request.data['id'])
        old_ride = ride.get_fields()
        if user == old_ride['host']:
            ride.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


                



        



class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RequestsViewSet(viewsets.ModelViewSet, PostReviewWritePermission):
    # queryset = Requests.objects.all()
    serializer_class = RequestsSerializer
    permission_classes = [TokenHasReadWriteScope]
    filter_fields = (
        'req_by',
        'req_to'
    )

    def create(self, request, *args, **kwargs):
        user = AccessToken.objects.get(token=request.META['HTTP_AUTHORIZATION'][7:]).user
        ride = Ride.objects.get(id=request.data['req_to'])
        del request.data['req_by']
        del request.data['req_to']
        request.data['req_by'] = user.id
        request.data['req_to'] = ride.id
        return super().create(request)

    def get_queryset(self, *args, **kwargs):
        # print('hello?',self.request)
        if len(self.request.query_params)==1:
            ride = Ride.objects.get(id=self.request.query_params['req_to'])
            print(Requests.objects.filter(req_to=ride))
            return Requests.objects.filter(req_to=ride)
        user = AccessToken.objects.get(token=self.request.META['HTTP_AUTHORIZATION'][7:]).user
        req = Requests.objects.filter(req_by=user.id)
        return req

    def destroy(self, request, *args, **kwargs):
        user = AccessToken.objects.get(token=request.META['HTTP_AUTHORIZATION'][7:]).user
        print(self.request.data,"????")
        req = Requests.objects.get(id=self.request.data['id'])
        req.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

