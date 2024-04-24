# Generated by Django 5.0 on 2024-04-19 03:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('UserID', models.AutoField(primary_key=True, serialize=False)),
                ('FirstName', models.CharField(blank=True, max_length=50, null=True)),
                ('LastName', models.CharField(blank=True, max_length=50, null=True)),
                ('Gender', models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female')], max_length=10, null=True)),
                ('DateOfBirth', models.DateField(blank=True, null=True)),
                ('IsActive', models.BooleanField(default=False)),
                ('CreationTime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='RepartoireActivity',
            fields=[
                ('RepID', models.AutoField(primary_key=True, serialize=False)),
                ('RepLable', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Structure',
            fields=[
                ('StructureID', models.AutoField(primary_key=True, serialize=False)),
                ('StructureLabel', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FaceEmbeddings',
            fields=[
                ('UserID', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='app.users')),
                ('FaceEmbedding', models.BinaryField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='AccessLogs',
            fields=[
                ('LogID', models.AutoField(primary_key=True, serialize=False)),
                ('AccessTime', models.DateTimeField(auto_now_add=True)),
                ('AccessResult', models.CharField(choices=[('Granted', 'Granted'), ('Denied', 'Denied')], max_length=10)),
                ('UserID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.users')),
            ],
        ),
        migrations.CreateModel(
            name='Camera',
            fields=[
                ('CameraID', models.AutoField(primary_key=True, serialize=False)),
                ('CameraLabel', models.CharField(blank=True, max_length=50, null=True)),
                ('IsActive', models.BooleanField(default=False)),
                ('StructureID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.structure')),
            ],
        ),
    ]
