# Generated by Django 3.0.7 on 2020-11-20 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DeviceInformation',
            fields=[
                ('deviceid', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('lat', models.FloatField(blank=True, null=True)),
                ('long', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'device',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='DigitalFence',
            fields=[
                ('userid', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('lat1', models.FloatField(blank=True, null=True)),
                ('long1', models.FloatField(blank=True, null=True)),
                ('lat2', models.FloatField(blank=True, null=True)),
                ('long2', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'digitalfence',
                'managed': True,
            },
        ),
    ]