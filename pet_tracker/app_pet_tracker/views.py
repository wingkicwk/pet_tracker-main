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
        # save digital fence information to 'digitalfence' table in database
        digitalfencedata = DigitalFence(userid=request.POST['username'],
                                        lat1=request.POST['q1_lat'],long1=request.POST['q1_long'],
                                        lat2=request.POST['q2_lat'],long2=request.POST['q2_long'])
        digitalfencedata.save()
        # render a test dictionary
        result = {"IsSuccess": True}
    else:
        result = {"IsSuccess": False,
                  "reason": "no request!"}
    return JsonResponse(result, safe=False)

#get - getfence
def getFence(request):
    if request.GET:
        fencedata = DigitalFence.objects.filter(userid = request.POST['username'])
        result =  {"IsSuccess": True,
                   "username": request.POST['username'],
                   "Point1":[fencedata[0].lat1,fencedata[0].long1],
                   "Point2":[fencedata[0].lat2,fencedata[0].long2]}
    else:
        result = {"IsSuccess": False,
                  "reason": "no request!"}
    return JsonResponse(result, safe=False)

#get - clearfence
def clearFence(request):
     if request.GET:
        # set the longitude and latitude to zero with given user
        result = DigitalFence(userid=request.POST['username'],lat1=0,long1=0,lat2=0,long2=0)
        result.save()
        result = {"IsSuccess": True}
     else:
         result = {"IsSuccess": False,
                   "reason": "no request!"}
     return JsonResponse(result, safe=False)


# get - petpostion
def petPosition(request):
    if request.GET:
        #get corresponding equipmentid with given username
        queryset = User.objects.filter(username = request.POST['username'])
        equipmentid = queryset[0].equipmentID

        #create a test user information to replace request.get.get('getfence')
        petposition = DeviceInformation.objects.filter(deviceid = equipmentid)
        result = { "IsSuccess": True,
                   "username": request.POST['username'],
                   "deviceid":petposition[0].deviceid,
                   "Point":[petposition[0].lat,petposition[0].long]
                   }
    else:
         result = {"IsSuccess": False,
                   "reason": "no request!"}
    return JsonResponse(result, safe=False)





