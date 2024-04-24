"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path
from app.views import add_user,webcam_stream,get_logs,get_cameras_for_structure,get_structures


urlpatterns = [
    path('admin/', admin.site.urls),
    path('add_user/', add_user, name='add_user'),
    path('stream/<int:structure_id>/<int:camera_id>/', webcam_stream, name='webcam_stream'),
    path('get_logs/', get_logs, name='get_logs'),
    path('structures/', get_structures, name='get_str_camera'),
    path('cameras/<int:structure_id>/', get_cameras_for_structure, name='get_cameras_for_structure'),
]

