# -*- coding: utf-8 -*-
from django.shortcuts import render
from datetime import datetime
from django.views.generic import View
from django.http import HttpResponse
from django.views.decorators import csrf
from .models import DeviceInformation,DigitalFence
from userManage.models import User

# Create your views here.
def home(request):
    username = request.session.get('username')
    print("username: ",username)
    return render(request,'home.html')

def post(request):
    return render(request,'home.html')

# post - setupfence
def setupFence(request):
    ctx ={} #to render final result
    if request.POST:
        print("here is the request: ",request.POST)
        ctx['rlt'] = request.POST
    # # test data from request
    # print("here is the post content: ",request.POST)
    # print("user information: ",User.username)
    # print("user information from request: ",request.user)
    # print("user id from request: ",request.user.id)
    username = request.session.get('username')
    print("username in setup fence: ",username)
    # save digital fence information to 'digitalfence' table in database
    print("q1_lat = ",request.POST['q1_lat'])
    digitalfencedata = DigitalFence(userid=username,lat1=request.POST['q1_lat'],long1=request.POST['q1_long'],lat2=request.POST['q2_lat'],long2=request.POST['q2_long']) #combine with 'login data'
    digitalfencedata.save()

    # render a test dictionary
    temp = {"rlt": "digital fence set up successfully"}
    return render(request, "home.html", temp)

def getFence(request):
     print("here is the get content: ",request.GET.get('getfence')) #empty: should combine with 'login data'
     username = request.session.get('username')
     print("username in get fence: ",username)
     #create a test user information to replace request.get.get('getfence')
     queryset = DigitalFence.objects.filter(userid = username)
     print("here is the result for get fence: ", queryset[0])
     temp2 = {"rlt2": queryset[0]}
     return render(request, "home.html", temp2)

def clearFence(request):
     print("here is the get content: ",request.GET.get('clearfence')) #empty: should combine with 'login data'
     username = request.session.get('username')
     print("username in get fence: ",username)
     # create a test row in 'device' table
     test3 = DigitalFence(userid=username,lat1=0,long1=0,lat2=0,long2=0) #combine with 'login data'
     test3.save()

     temp3 = {"rlt3": "you have clear stored data about the digital fence"}
     return render(request, "home.html", temp3)


# post - petpostion
def petPosition(request):

    print("here is the get content(petpostion): ",request.GET.get('petposition')) #empty: should combine with 'login data'

    username = request.session.get('username')
    queryset = User.objects.filter(username = username)
    print("here is the result for get fence: ", queryset[0])
    equipmentid = queryset[0].equipmentID

    # create a test row in 'device' table
    test1 = DeviceInformation(deviceid=equipmentid,lat=35.0,long=6.7)#combine with 'login data'
    test1.save()

    #create a test user information to replace request.get.get('getfence')
    queryset = DeviceInformation.objects.filter(deviceid = equipmentid)
    print("here is the result for get fence: ", queryset[0].lat)

    temp4 = {"rlt4": queryset[0]}
    return render(request, "home.html", temp4)




