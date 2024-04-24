from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Users,FaceEmbeddings,AccessLogs,Structure,Camera

# Register your models here.
admin.site.register(Users)
admin.site.register(FaceEmbeddings)
admin.site.register(AccessLogs)
admin.site.register(Structure)
admin.site.register(Camera)