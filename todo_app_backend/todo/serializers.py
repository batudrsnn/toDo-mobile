from rest_framework import serializers
from .models import toDo, appUser

class appUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = appUser
        fields = ['username', 'is_admin']


class toDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = toDo
        fields = ['user', 'task_title', 'details', 'completed', 'deadline']