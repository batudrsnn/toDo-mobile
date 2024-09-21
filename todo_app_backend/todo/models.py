from typing import Any, Iterable
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.exceptions import ValidationError

from django.utils.functional import cached_property

"""
  APPUSER CREATE POST API ENDPOINT
  
"""
class appUser(AbstractUser):
    username = models.CharField(max_length=30, blank=False, unique=True)
    password = models.CharField(max_length=30, blank=False)
    #is_admin = models.BooleanField(default=False)

    
    def save(self, *args, **kwargs):
      if not self.password:
        raise ValidationError("Password cannot be empty.")
      
      super(appUser,self).save(*args, **kwargs)
     
     
    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField('todo.appUser', on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=50, blank=False)
    surname = models.CharField(max_length=5, blank=False)
    photo = models.ImageField(default='default.jpg', upload_to='profile_images')
    
    
    REQUIRED_FIELDS = ['name', 'surname']
    
    @cached_property
    def full_name(self):
      return self.name+self.surname

    def __str__(self):
        return self.user.username
    


class toDo(models.Model):
    user = models.ForeignKey('todo.appUser', on_delete=models.CASCADE)
    task_title = models.CharField(max_length=100, default="Enter a title..")
    details = models.CharField(max_length=1000, default="Enter a detail..")
    completed = models.BooleanField(default=False)
    deadline = models.DateField(default=timezone.now().date())
    
    def save(self, *args, **kwargs):
      if self.deadline < timezone.now().date():
        raise ValidationError("The date cannot be in the past!")
      super(toDo, self).save(*args, **kwargs)
      
      
    def __str__(self):
       return self.task_title[:30]
     
     
     

