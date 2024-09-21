from django.shortcuts import render
from rest_framework import viewsets, status
from .models import toDo, appUser
from .serializers import toDoSerializer, appUserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.exceptions import PermissionDenied

class toDoViewSet(viewsets.ModelViewSet):
    queryset = toDo.objects.all()
    serializer_class = toDoSerializer
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return toDo.objects.all()
        else:
            return toDo.objects.filter(user=user)  
    
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        
        data['user'] = request.user.id
        
        serializer = self.get_serializer(data=data)
        
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT, headers=headers)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        
        if instance.owner == user or user.is_superuser:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise PermissionDenied("You do not have permission to delete this toDo.")
        





class appUserViewSet(viewsets.ModelViewSet):
    queryset = appUser.objects.all()
    serializer_class = appUserSerializer
    permission_classes = [IsAdminUser]
    
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAdminUser]
        elif self.action == 'create':
            permission_classes = [AllowAny]
        elif self.action == 'destroy':
            permission_classes = [IsAdminUser]
        else:
            permission_classes = self.permission_classes
            
        return [permission() for permission in permission_classes]
        
        
    def list(self, request, *args, **kwargs):
        
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        
        return super().create(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        
        return super().destroy(request, *args, **kwargs)
    
    """ http://127.0.0.1:8000/api/appUsers/9/   it gets id as parameter in url. deletes the user with id=9"""