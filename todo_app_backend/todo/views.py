from typing import Any
from django.db.models.base import Model as Model
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import ToDo, User
from .serializer import ToDoSerializer


class ToDoListView(ListCreateAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        todo = ToDo.objects.filter(user=user)
        
        return todo
    
    
class ToDoListDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ToDoSerializer
    
    def get_object(self):
        user_id = self.kwargs["user_id"]
        todo_id = self.kwargs["todo_id"]
        
        user = User.objects.get(id=user_id)
        todo = ToDo.objects.get(id=todo_id, user=user)
        
        return todo
        