from django.db import models

# Create your models here.

# class Test(models.Model):
#     name = models.CharField(max_length=20)

class DeviceInformation(models.Model):
    deviceid = models.CharField(primary_key=True, max_length=30)
    lat = models.FloatField(blank=True, null=True)
    long = models.FloatField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'device'

class DigitalFence(models.Model):
    userid = models.CharField(primary_key=True, max_length=30)
    lat1 = models.FloatField(blank=True, null=True)
    long1 = models.FloatField(blank=True, null=True)
    lat2 = models.FloatField(blank=True, null=True)
    long2 = models.FloatField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'digitalfence'




