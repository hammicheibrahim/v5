from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Users, FaceEmbeddings,AccessLogs,Camera
from django.http import JsonResponse,StreamingHttpResponse
import json
import numpy as np
from django.db.models import F
import base64
import os
from django.shortcuts import render

import cv2
from .utils  import similarity_function,get_embedding,verify_access,process_frame
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from .models import Users, AccessLogs


###############   add user ##############################
@csrf_exempt 
def add_user(request):
    if request.method == 'POST':
        try:
            # Assuming you pass user information in the request.POST
            first_name = request.POST.get('first_name', '')
            last_name = request.POST.get('last_name', '')
            gender = request.POST.get('gender', '')
            date_of_birth = request.POST.get('date_of_birth', '')
            
            # Validate the required parameters
            if not first_name or not last_name or not gender or not date_of_birth:
                return JsonResponse({'result': 'Error', 'message': 'Incomplete user information.'})

             # Create a new user
            user = Users.objects.create(
                FirstName=first_name,
                LastName=last_name,
                Gender=gender,
                DateOfBirth=date_of_birth,
                IsActive=True  
            )

            # Extract a single face from the uploaded image
            uploaded_image = request.FILES.get('profile_picture', None)
            if not uploaded_image:
                return JsonResponse({'result': 'Error', 'message': 'Profile picture is missing.'})

            image_array = cv2.imdecode(np.frombuffer(uploaded_image.read(), np.uint8), cv2.IMREAD_COLOR)

            embedding = get_embedding(image_array)
            import pickle

            # Convert the embedding to bytes using Pickle
            embedding_bytes = pickle.dumps(embedding)

            # Save the face embedding
            face_embedding = FaceEmbeddings.objects.create(
                UserID=user,
                FaceEmbedding=embedding_bytes  # Save as bytes
            )  
            return JsonResponse({'result': 'Success', 'user_id': user.UserID})

        except Exception as e:
            return JsonResponse({'result': 'Error', 'message': str(e)})

    else:
        return JsonResponse({'result': 'Error', 'message': 'Invalid request method. Use POST.'})

###############     add structure #########################

###############     add camera    #########################

##############  web came #####################################

# def get_structure_camera(request):

#     return structure_id,camera_ip


@csrf_exempt
def webcam_stream(request, structure_id, camera_id):
    
    # add something ibrahim 
    #get_structure_camera()  it use the submit  of react 
    # use get_authired_structure(structure) is api  as input  from utils.py
    cap = cv2.VideoCapture(0)
    # adress = 'https://192.168.245.52:8080/video'
    # cap.open(adress)
    print(structure_id)
    #  get from react the selected structure and selected camers
    def stream():
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frame=process_frame(frame=frame)
            # Convert the frame to JPEG format
            _, buffer = cv2.imencode('.jpg', frame)
            
            # Yield the frame data
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    return StreamingHttpResponse(stream(), content_type='multipart/x-mixed-replace; boundary=frame')

def get_logs(request):
    try:
        users_with_access_logs = []
        # Fetch users with access logs
        users_with_logs = Users.objects.filter(accesslogs__isnull=False).distinct()
        for user in users_with_logs:
            # Fetch last access log for each user
            last_access_log = AccessLogs.objects.filter(UserID=user).latest('AccessTime')
            
            # Serialize user and last access log data
            user_data = {
                'UserID': user.UserID,
                'FirstName': user.FirstName,
                'LastName': user.LastName,
                'Gender': user.Gender,
                'DateOfBirth': str(user.DateOfBirth),
                'IsActive': user.IsActive,
                'CreationTime': str(user.CreationTime),
                'LastAccessLog': {
                    'LogID': last_access_log.LogID,
                    'AccessTime': str(last_access_log.AccessTime),
                    'AccessResult': last_access_log.AccessResult
                }
            }
            users_with_access_logs.append(user_data)

        # Return the JSON response
        return JsonResponse({'users': users_with_access_logs})
    except Exception as e:
        return JsonResponse({'result': 'Error', 'message': str(e)}, status=500)


from django.shortcuts import render
from django.http import JsonResponse
from .models import Structure, Camera

def get_structures(request):
    structures = Structure.objects.all()
    data = [{'id': structure.StructureID, 'label': structure.StructureLabel} for structure in structures]
    return JsonResponse(data, safe=False)

def get_cameras_for_structure(request, structure_id):
    cameras = Camera.objects.filter(StructureID=structure_id)
    data = [{'id': camera.CameraID, 'label': camera.CameraLabel} for camera in cameras]
    print(data)
    return JsonResponse(data, safe=False)











