from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import numpy as np
import cv2
import os
import urllib.request


class FaceDetectView(APIView):
    
    data = {"success": False}
    
    FACE_DETECTOR_PATH = "{base_path}/cascades/haarcascade_frontalface_default.xml".format(base_path=os.path.abspath(os.path.dirname(__file__)))
    
    def receive_image(self, path=None, stream=None, url=None):
        
        if path is not None:
            image = cv2.imread(path)
        
        else:
            if url is not None:
                resp = urllib.request.urlopen(url)
                data = resp.read()
                
            elif stream is not None:
                image = stream.read()
                
        image = np.asarray(bytearray(data), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        
        return image
    
    def post(self, request):
        
        if request.POST["image"]:
            image = self.receive_image(stream = request.POST["image"])
         
        else:
            url = request.POST.get("url")
            
            if url is None:
                self.data["error"] = "No URL provided."
                return JsonResponse(self.data)
            
        image = self.receive_image(url=url)
            
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        #detector = cv2.CascadeClassifier(self.FACE_DETECTOR_PATH)
        #rects = detector.detectMultiScale(image, scaleFactor=1.1, minNeighbors=5,minSize=(30, 30), flags = cv2.CASCADE_SCALE_IMAGE)
		# construct a list of bounding boxes from the detection
        #rects = [(int(x), int(y), int(x + w), int(y + h)) for (x, y, w, h) in rects]
		# update the data dictionary with the faces detected
        self.data.update({"image": image, "success": True})
  
        return Response(self.data)
            
