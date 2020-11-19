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

# Create your views here.
def register(request):
    if request.method == 'GET':
        # return register page
        return render(request, 'register.html')
    else:
        context={'success':False}

        username = request.POST['username']
        password = request.POST['pwd']
        password_cfm = request.POST['pwdcfm']
        equipmentID = request.POST['equipmentID']
        email = request.POST['email']

        # lack user name
        if username == "":
            return render(request, 'register.html', {'errormessage': 'Lack user name '})

        # lack password 
        if password == "":
            return render(request, 'register.html', {'errormessage': 'Lack password'})

        # two passwords are not the same
        if password != password_cfm:

            return render(request, 'register.html', {'errormessage': 'two passwords not the same'})

        if equipmentID == "":
            return render(request, 'register.html', {'errormessage': 'Lack equipmentID'})

        if email == "":
            return render(request, 'register.html', {'errormessage': 'Lack email'})

        # check if the user has been registered
        try:
            user = User.objects.get(username=username)
        except:
        # user does not exist
            user = None
        # already a registered username
        if user:
            print('user already exists')              
            return render(request, 'register.html', {'errormessage': 'user already exists'})
        # check if the equipmentId has been registered
        try:
            EID = User.objects.get(equipmentID=equipmentID)
        except:
        # user does not exist
            EID = None
        # already a registered equipmentID
        if EID:
            print('equipmentID already exists')            
            return render(request, 'register.html', {'errormessage': 'equipmentID already exists'})

        #  process the registration
        user = User()
        user.username = username
        user.password = make_password(password)
        user.equipmentID = equipmentID
        user.email = email

        user.save()
        context={'alertinfo': 'Welcome to the pettracker', 'username': username, 'success':True}
        return render(request, 'login.html', context)


def login(request):

    context={}
    # if request is from other pages
    if request.method == 'GET':
        if 'username' in request.COOKIES:
            username = request.COOKIES.get('username')
        else:
            username = ''
        # show register page
        return render(request, 'login.html', {'username': username})

    # if the request is from login html form
    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']
        
        # a logged in user 
        if request.session.get('username') == username:
            context['username'] = request.session.get('username')
            return render(request, "home.html", context)

        # no username or password
        if not all([username, password]):
            return render(request, 'login.html', {'errormessage': 'missing username or password'})

        # check if it is a registered user
        try:
            user = User.objects.get(username=username)
        except:
            user = None

        if user == None:
            return render(request, 'login.html', {'errormessage': 'Username does not exist, cilck "register" to become a registered user.'})

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

            context['username'] = username
            return render(request, "home.html", context)
        # username and password not match
        else:
            return render(request, 'login.html', {'errmsg': 'username does not match password', "username": username})

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
        print('About to logout now')
        context={}
        try:
            print(request.session['username'])
            request.session.flush()   # flush delete session data
        except KeyError:
            print('keyerror')      
        return render(request, "home.html", context)

