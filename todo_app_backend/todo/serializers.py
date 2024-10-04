from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


class appUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = appUser
        fields = ['username', 'password', 'email']
            
    def validate_password(self, value: str) -> str:

        return make_password(value)
    
    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['name', 'surname', 'photo']
        

class TeamSerializer(serializers.ModelSerializer):
    members = appUserSerializer(many=True, read_only=True) 
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'admin', 'members']


class toDoSerializer(serializers.ModelSerializer):
    creator = appUserSerializer(read_only=True)  
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), required=False)
    user = serializers.PrimaryKeyRelatedField(queryset=appUser.objects.all(), required=False)

    class Meta:
        model = toDo
        fields = ['id', 'task_title', 'details', 'completed', 'deadline', 'creator', 'team', 'user']

    #def create(self, validated_data):
    #    request = self.context.get('request')
    #    validated_data['creator'] = request.user  # Set the creator automatically
    #    return super().create(validated_data)