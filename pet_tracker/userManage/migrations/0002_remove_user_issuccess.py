# Generated by Django 3.0.7 on 2020-11-16 20:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManage', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='isSuccess',
        ),
    ]