from typing import Any, Iterable
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.exceptions import ValidationError

from django.utils.functional import cached_property


class appUser(AbstractUser):
    username = models.CharField(max_length=30, blank=False, unique=True)
    password = models.CharField(max_length=100, blank=False)
    email = models.EmailField(blank=False, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    teams = models.ManyToManyField('todo.Team', through='TeamMembership', related_name='members', blank=True)

    REQUIRED_FIELDS = ['password', 'email']
    
    def save(self, *args, **kwargs):
      if not self.password:
        raise ValidationError("Password cannot be empty.")
      elif not self.email:
        raise ValidationError("Email cannot be empty.")
      
      super(appUser,self).save(*args, **kwargs)
     
     
     
    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField('todo.appUser', on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    surname = models.CharField(max_length=50, blank=False)
    photo = models.ImageField(default='default.jpg', upload_to='profile_images')
    
    
    REQUIRED_FIELDS = ['name', 'surname']
    
    @cached_property
    def full_name(self):
      return self.name+self.surname

    def __str__(self):
        return self.user.username
    


class toDo(models.Model):
  """ 
    (REQUIRED) creator:  The user who created the todo entry (whether individual or team)
    (optional) user: For individual todos
    (optional) team: For team-based todos
  
  """
    
  creator = models.ForeignKey('todo.appUser', on_delete=models.CASCADE, null=False, related_name='created_todos')
  user = models.ForeignKey('todo.appUser', on_delete=models.CASCADE)
  task_title = models.CharField(max_length=100, default="Enter a title..")
  details = models.CharField(max_length=1000, default="Enter a detail..")
  completed = models.BooleanField(default=False)
  deadline = models.DateField(default=timezone.now().date())
    
  def save(self, *args, **kwargs):
      if self.deadline < timezone.now().date():
        raise ValidationError("The date cannot be in the past!")
      
      if self.user is None and self.team is None:
            raise ValidationError("A todo must belong to either a user or a team.")
          
      super(toDo, self).save(*args, **kwargs)
      
      
  def __str__(self):
       return self.task_title[:30]
     
     
     

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Optional team admin - one user can be assigned as the admin of the team
    admin = models.ForeignKey('todo.appUser', on_delete=models.SET_NULL, null=True, related_name='admin_teams')

    def __str__(self):
        return self.name
    
    

class TeamMembership(models.Model):
    user = models.ForeignKey('todo.appUser', on_delete=models.CASCADE)
    team = models.ForeignKey('todo.Team', on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=20, choices=[('member', 'Member'), ('admin', 'Admin')], default='member')

    def __str__(self):
        return f'{self.user.username} in {self.team.name}'