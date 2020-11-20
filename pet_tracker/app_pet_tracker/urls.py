from django.urls import path
from django.conf.urls import url
from . import views
urlpatterns=[
    url('',views.home,name='home'),
    # path('post/',views.post,name='post'),
    # url(r'^setupfence$', views.setupFence),
    # url(r'^getfence$', views.getFence),
    # url(r'^clearfence$', views.clearFence),
    # url(r'^petposition$', views.petPosition),
]
