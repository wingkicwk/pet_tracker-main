from django.shortcuts import render
from django.http import HttpResponse
from userManage.models import User
# Create your views here.
def home(request):
    return render(request,'home.html')