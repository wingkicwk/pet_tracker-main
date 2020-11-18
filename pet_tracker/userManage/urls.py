from django.conf.urls import url
from django.urls import path
from django.views.static import serve
from django.contrib import admin
from userManage import views

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.contrib import staticfiles

app_name = 'userManage'
# admin.site.site_header = 
admin.site.site_title = 'Welcome to pet tracker admin page'
# admin.site.site_title
urlpatterns = [
    url(r'^register/', views.register, name='register'),
    url(r'^login/', views.login, name='login'),
    url(r'^logout/', views.logout, name='logout'),
]
urlpatterns += staticfiles_urlpatterns()