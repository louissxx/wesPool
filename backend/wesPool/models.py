from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# use a many to many relationship? will have to explore this more in depth

# Create your models here.
class Ride(models.Model):
    host = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='host')
    date_time = models.DateTimeField()
    src = models.CharField(max_length=500)
    dst = models.CharField(max_length=500)
    group = models.ManyToManyField(User, related_name='group')
    seats = models.IntegerField()
    price = models.IntegerField()
    uber = models.BooleanField()

    def __str__(self):
        return self.host.username+':'+self.src+'->'+self.dst
    
    def get_fields(self):
        d = {}
        for field in Ride._meta.fields:
            d[field.name] = getattr(self,field.name)
        for field in Ride._meta.many_to_many:
            d[field.name] = getattr(self,field.name)
        lst = []
        for user in d['group'].all():
            lst.append(user.id)
        d['group']=lst
        return d

    

class Requests(models.Model):
    req_by = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='req_by')
    text_req = models.CharField(max_length=500)
    req_to = models.ForeignKey(Ride, on_delete=models.CASCADE, related_name='req_to')

    def __str__(self):
        return str(self.req_to)

    def get_fields(self):
        d = {}
        for field in Requests._meta.fields:
            d[field.name] = getattr(self,field.name)
        return d


