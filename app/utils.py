



from deepface import DeepFace
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Users, FaceEmbeddings,AccessLogs
from django.http import JsonResponse
import json
import numpy as np
from django.db.models import F
import base64
import os
from django.shortcuts import render
from sklearn.metrics.pairwise import cosine_similarity
import cv2
import pickle


def get_embedding(image_path):
    # Extract face embedding
    face_embedding = DeepFace.represent(image_path, model_name='Facenet')[0]['embedding']
    return face_embedding

def similarity_function(embedding1, embedding2):
    normalized_embedding1 = embedding1 / np.linalg.norm(embedding1)
    normalized_embedding2 = embedding2 / np.linalg.norm(embedding2)
    return cosine_similarity([normalized_embedding1], [normalized_embedding2])[0][0]



def verify_person(face, stored_embeddings , threshold=0.6):
    try:
        if not stored_embeddings:
            print("No stored embeddings available.")
            return None, None
        verification_results = {}
        for id, stored_embedding in stored_embeddings.items():
            similarity = similarity_function(face, stored_embedding)
            verification_results[id] = similarity

        verified_employee = None
        max_similarity = max(verification_results.values())
        if max_similarity >= threshold:
            verified_employee = max(verification_results, key=verification_results.get)

        return verified_employee, max_similarity
    except Exception as e:
        print(f"Error during verification: {e}")
        return None, None


stored_embeddings = {}
face_embeddings = FaceEmbeddings.objects.values('UserID_id', 'FaceEmbedding')

for face_embedding in face_embeddings:
    user_id = face_embedding['UserID_id']
    embedding = pickle.loads(face_embedding['FaceEmbedding'])
    stored_embeddings[user_id] = embedding

def process_frame(frame):
    global stored_embeddings
    background_subtractor = cv2.createBackgroundSubtractorMOG2()
    results = []
    fg_mask = background_subtractor.apply(frame)

    
    # Use the mask to extract only the foreground (faces)
    frame = cv2.bitwise_and(frame, frame, mask=fg_mask)
    face_embeddings = DeepFace.represent(frame, detector_backend='opencv', model_name='Facenet', enforce_detection=False)
    if face_embeddings:
        for face in face_embeddings:
            x, y, w, h = face["facial_area"]["x"], face["facial_area"]["y"], face["facial_area"]["w"], face["facial_area"]["h"]
            verified_user_id, similarity_score = verify_person(face['embedding'], stored_embeddings)
            print(similarity_score)
            if verified_user_id:
                user = Users.objects.filter(UserID=verified_user_id).values('FirstName', 'LastName').first()
                name = f"{user['FirstName']} {user['LastName']}" if user else "Unknown"
                access_log_entry = AccessLogs.objects.create(
                    UserID_id=verified_user_id,
                    AccessResult='Granted',
                )
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(frame, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            else:
                name = "Unknown"
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
                cv2.putText(frame, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
    return frame


def verify_access(frame):
    # Initialize results list
    results = []
    face_embeddings = DeepFace.represent(frame, detector_backend='opencv', model_name='Facenet', enforce_detection=False)
    if face_embeddings:
        for face in face_embeddings:
            x, y, w, h = face["facial_area"]["x"], face["facial_area"]["y"], face["facial_area"]["w"], face["facial_area"]["h"]
            verified_user_id, similarity_score = verify_person(face['embedding'], stored_embeddings)
            if verified_user_id:
                user = Users.objects.filter(UserID=verified_user_id).values('FirstName', 'LastName').first()
                name = f"{user['FirstName']} {user['LastName']}" if user else "Unknown"
                access_log_entry = AccessLogs.objects.create(
                    UserID_id=verified_user_id,
                    AccessResult='Granted',
                )
                # Dessiner la boîte autour du visage détecté
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                # Ajouter le texte du nom
                cv2.putText(frame, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            else:
                name = "Unknown"
                # Dessiner la boîte autour du visage détecté
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
                # Ajouter le texte du nom
                cv2.putText(frame, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    return frame

    
