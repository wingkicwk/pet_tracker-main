"""pet_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include,url
from app_pet_tracker import views
urlpatterns = [
    # path('app_pet_tracker/', include('app_pet_tracker.urls', namespace='app_pet_tracker')),
    url(r'^app_pet_tracker/', include(('app_pet_tracker.urls', 'app_pet_tracker'), namespace='app_pet_tracker')),
    path('admin/', admin.site.urls),
    path('userManage/', include('userManage.urls', namespace='userManage')),
    path('', views.home,name='home'),
    path('post/',views.post,name='post'),
    url(r'^setupfence$', views.setupFence),
    url(r'^getfence$', views.getFence),
    url(r'^clearfence$', views.clearFence),
    url(r'^petposition$', views.petPosition),
]
