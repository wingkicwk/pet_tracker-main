from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=30, primary_key=True)
    password = models.CharField(max_length=300)
    equipmentID = models.CharField(max_length=300)
    email = models.EmailField()

    def __str__(self):
        return self.username+" - "+self.equipmentID