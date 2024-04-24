from django.db import models


class Users(models.Model):
    UserID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=50, null=True, blank=True)
    LastName = models.CharField(max_length=50, null=True, blank=True)
    Gender = models.CharField(max_length=10, 
            choices=[('Male', 'Male'), ('Female', 'Female')], null=True, blank=True)
    DateOfBirth = models.DateField(null=True, blank=True)
    IsActive = models.BooleanField(default=False)
    CreationTime = models.DateTimeField(auto_now_add=True)
   
class FaceEmbeddings(models.Model):
    UserID = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True)
    FaceEmbedding = models.BinaryField(null=True, blank=True)
    
class AccessLogs(models.Model):
    LogID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(Users, on_delete=models.CASCADE)
    AccessTime = models.DateTimeField(auto_now_add=True)
    AccessResult = models.CharField(max_length=10, choices=[('Granted', 'Granted'), ('Denied', 'Denied')])
class Structure(models.Model):
    StructureID = models.AutoField(primary_key=True)
    StructureLabel = models.CharField(max_length=50, null=True, blank=True)

class Camera(models.Model):
    CameraID = models.AutoField(primary_key=True) 
    CameraLabel = models.CharField(max_length=50, null=True, blank=True)
    IsActive = models.BooleanField(default=False)
    StructureID = models.ForeignKey(Structure, on_delete=models.CASCADE)

class RepartoireActivity(models.Model):
       RepID = models.AutoField(primary_key=True)
       RepLable = models.CharField(max_length=50, null=True, blank=True)

    

