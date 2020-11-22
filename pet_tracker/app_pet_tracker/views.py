# -*- coding: utf-8 -*-
from django.shortcuts import render
from .models import DeviceInformation,DigitalFence
from userManage.models import User
from django.http import JsonResponse

# Create your views here.
def home(request):
    return render(request,'home.html')

# post - setupfence
def setupFence(request):
    if request.POST:
        print("here for request-setup: ",request.POST)
        username = request.session.get('username') # get login user's username
        if str(username) == "None" : # for unlogin users
            result = {"IsSuccess": "please login in!"}
        else:
            # save digital fence information to 'digitalfence' table in database
            digitalfencedata = DigitalFence(userid=username,lat1=request.POST['q1_lat'],long1=request.POST['q1_long'],lat2=request.POST['q2_lat'],long2=request.POST['q2_long']) #combine with 'login data'
            digitalfencedata.save()
            # render a test dictionary
            result = {"IsSuccess": "digital fence set up successfully"}
    else:
        result = {"IsSuccess": "no request!"}
    return JsonResponse(result, safe=False)

#get - getfence
def getFence(request):
    print("here for request-get: ",request.POST)
    if request.GET:
        username = request.session.get('username') # get login user's username
        if str(username) == "None" : # for unlogin users
            result = {"IsSuccess": "please login in!"}
        else:
            fencedata = DigitalFence.objects.filter(userid = username)
            result =  {"IsSuccess": "get the data successfully!",
                       "username": username,
                       "Point1":[fencedata[0].lat1,fencedata[0].long1],
                       "Point2":[fencedata[0].lat2,fencedata[0].long2]
                       }
    else:
        result = {"IsSuccess": "no request!"}
    return JsonResponse(result, safe=False)

#get - clearfence
def clearFence(request):
     if request.GET:
        username = request.session.get('username') # get login user's username
        if str(username) == "None" : # for unlogin users
            result = {"IsSuccess": "please login in!"}
        else:
            # set the longitude and latitude to zero with given user
            result = DigitalFence(userid=username,lat1=0,long1=0,lat2=0,long2=0)
            result.save()
            result = {"IsSuccess": "you have cleared the stored data about the digital fence"}
     else:
         result = {"IsSuccess": "no request!"}
     return JsonResponse(result, safe=False)


# get - petpostion
def petPosition(request):
    if request.GET:
        username = request.session.get('username') # get login user's username
        if str(username) == "None" : # for unlogin users
            result = {"IsSuccess": "please login in!"}
        else:
            #get corresponding equipmentid with given username
            queryset = User.objects.filter(username = username)
            equipmentid = queryset[0].equipmentID

            #create a test user information to replace request.get.get('getfence')
            petposition = DeviceInformation.objects.filter(deviceid = equipmentid)
            result = {"IsSuccess": "get the data successfully!",
                       "username": username,
                       "deviceid":petposition[0].deviceid,
                      "Point":[petposition[0].lat,petposition[0].long]
                       }
    else:
         result = {"IsSuccess": "no request!"}
    return JsonResponse(result, safe=False)




