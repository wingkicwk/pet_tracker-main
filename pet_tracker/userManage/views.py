from django.shortcuts import render, redirect 
import json
import os
import re
from django.utils import timezone
from datetime import *
from django.contrib.auth import authenticate
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from django.http import HttpResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from userManage.models import User
from django.http.response import JsonResponse
from django.core import serializers
from app_pet_tracker.models import DeviceInformation

# Create your views here.
def register(request):
    if request.method == 'GET':
        # return register page
        return render(request, 'register.html')
    else:
        context={}

        username = request.POST['username']
        password = request.POST['pwd']
        password_cfm = request.POST['pwdcfm']
        equipmentID = request.POST['equipmentID']
        email = request.POST['email']

        # lack user name
        if username == "":
            context={'isSuccess':False, 'reason': 'Lack user name'}
            return JsonResponse(context) 
        # lack password 
        if password == "":
            context={'isSuccess':False, 'reason': 'Lack password'}
            return JsonResponse(context) 

        # two passwords are not the same
        if password != password_cfm:
            context={'isSuccess':False, 'reason': 'two passwords not the same'}
            return render(request, 'register.html', context)
            return JsonResponse(context) 

        if equipmentID == "":
            context={'isSuccess':False, 'reason': 'Lack equipmentID'}
            return JsonResponse(context) 
        if email == "":
            context={'isSuccess':False, 'reason': 'Lack email'}
            return JsonResponse(context) 
        # check if the user has been registered
        try:
            user = User.objects.get(username=username)
        except:
        # user does not exist
            user = None
        # already a registered username
        if user:
            context={'isSuccess':False, 'reason': 'user already exists'}           
            return JsonResponse(context) 
        # check if the equipmentId has been registered
        try:
            EID = User.objects.get(equipmentID=equipmentID)
        except:
        # user does not exist
            EID = None
        # already a registered equipmentID
        if EID:  
            context={'isSuccess':False, 'reason': 'equipmentID already exists'}        
            return JsonResponse(context) 
        #  process the registration
        user = User()
        user.username = username
        user.password = make_password(password)
        user.equipmentID = equipmentID
        user.email = email
        user.save()

        #  initialise device lat nad long to 0
        deviceInfo = DeviceInformation()
        deviceInfo.deviceid = equipmentID
        deviceInfo.lat = 0
        deviceInfo.long = 0
        deviceInfo.save()

        context = {'isSuccess':True}
        user = User.objects.values().filter(username=user.username)
        context['userInfo'] = list(user)
        return JsonResponse(context)


def login(request):

    # if request is from other pages
    if request.method == 'GET':
        if 'username' in request.COOKIES:
            username = request.COOKIES.get('username')
        else:
            username = ''
        # show login page
        return render(request, 'login.html', {'username': username})

    # if the request is from login html form
    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']
        
        # a logged in user 
        if request.session.get('username') == username:
            context =  {'isSuccess':False,'reason':'duplicate operation, user already logged in '}   
            return JsonResponse(context)            

        # no username or password
        if not all([username, password]):
            context =  {'isSuccess':False,'reason':'missing username or password'}   
            return JsonResponse(context)

        # check if it is a registered user
        try:
            user = User.objects.get(username=username)
        except:
            user = None

        if user == None:
            context =  {'isSuccess':False,'reason':'Username does not exist, cilck "register" to become a registered user'}   
            return JsonResponse(context)            

        # authenticate if the username and password matche
        user = authenticate(request=request, username=username, password=password)

        if user is not None:
            # set a session
            request.session['username'] = user.username
            request.session.set_expiry(60*15)   # when the user close the browser the session will expired

            the_url = request.GET.get('next', reverse('app_pet_tracker:home'))

            response = redirect(the_url, {'username': username}) 

            # to remember the username
            remember = request.POST.get('remember')
            if remember == 'on':
                # use cookie to store the username
                response.set_cookie('username', username, max_age=7 * 24 * 3600)
            else:
                response.delete_cookie('username')
            context = {'isSuccess':True}
            user = User.objects.values().filter(username=user.username)
            context['userInfo'] = list(user)
            return JsonResponse(context)
            # return JsonResponse(list(User.objects.values().filter(username=user.username) ), safe=False)


        # username and password not match
        else:
            context = {'isSuccess':False,'reason':'username does not match password'}
            return JsonResponse(context)

# to authenticate the if the username and password match with each other
class UserLoginBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):

        try:

            user = User.objects.get(Q(username=username) | Q(equipmentID=username)) 
            if check_password(password, user.password):
                return user
        except Exception as e:
            return None


def logout(request):
    if request.method == 'POST':
        try:
            print(request.session['username'])
            request.session.flush()   # flush delete session data
            context = {'isSuccess':True,'message':'already logged out'}  
        except KeyError:
            print('keyerror') 
            context =  {'isSuccess':False,'reason':'key error'}   
            return JsonResponse(context)
         
        return JsonResponse(context)

