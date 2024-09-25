from rest_framework import serializers
from .models import toDo, appUser
from django.contrib.auth.hashers import make_password


class appUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = appUser
        fields = ['username', 'password', 'email']
            
    def validate_password(self, value: str) -> str:

        return make_password(value)
    
    



class toDoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = toDo
        fields = ['user', 'task_title', 'details', 'completed', 'deadline']