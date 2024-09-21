from rest_framework import serializers
from .models import toDo, appUser

class appUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = appUser
        fields = ['username', 'password']


class toDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = toDo
        fields = ['user', 'task_title', 'details', 'completed', 'deadline']