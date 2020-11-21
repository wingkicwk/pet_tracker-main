# -*- coding: utf-8 -*-
from django.shortcuts import render
from .models import DeviceInformation,DigitalFence
from userManage.models import User

# Create your views here.
def home(request):
    return render(request,'home.html')

# post - setupfence
def setupFence(request):
    if request.POST:
        username = request.session.get('username') # get login user's username
        if str(username) == "None" : # for unlogin users
            result = {"setupfence": "please login in!"}
        else:
            # save digital fence information to 'digitalfence' table in database
            digitalfencedata = DigitalFence(userid=username,lat1=request.POST['q1_lat'],long1=request.POST['q1_long'],lat2=request.POST['q2_lat'],long2=request.POST['q2_long']) #combine with 'login data'
            digitalfencedata.save()
            # render a test dictionary
            result = {"setupfence": "digital fence set up successfully"}
    else:
        result = {"setupfence": "no request!"}
    return render(request, "home.html", result)

#get - getfence
def getFence(request):
    if request.GET:
        username = request.session.get('username') # get login user's username
        if str(username) == "None" : # for unlogin users
            result =  {"getfence": "please login in!"}
        else:
            fencedata = DigitalFence.objects.filter(userid = username)
            result = {"getfence": fencedata[0]}
    else:
        result = {"setupfence": "no request!"}
    return render(request, "home.html", result)

#get - clearfence
def clearFence(request):
     if request.GET:
        username = request.session.get('username') # get login user's username
        if str(username) == "None" : # for unlogin users
            result =  {"clearfence": "please login in!"}
        else:
            # set the longitude and latitude to zero with given user
            result = DigitalFence(userid=username,lat1=0,long1=0,lat2=0,long2=0)
            result.save()
            result = {"clearfence": "you have cleared the stored data about the digital fence"}
     else:
         result = {"clearfence": "no request!"}
     return render(request, "home.html", result)


# get - petpostion
def petPosition(request):
    if request.GET:
        username = request.session.get('username') # get login user's username
        if str(username) == "None" : # for unlogin users
            result = {"petposition": "please login in!"}
        else:
            #get corresponding equipmentid with given username
            queryset = User.objects.filter(username = username)
            equipmentid = queryset[0].equipmentID

            #create a test user information to replace request.get.get('getfence')
            petposition = DeviceInformation.objects.filter(deviceid = equipmentid)
            result = {"petposition": petposition[0]}
    else:
         result = {"petposition": "no request!"}
    return render(request, "home.html", result)




