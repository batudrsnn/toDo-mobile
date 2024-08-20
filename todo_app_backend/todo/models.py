from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length = 50, blank = False, unique = True)
    last_name = models.CharField(max_length = 20)
    
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    def __str__(self):
      return "{}".format(self.username)
    
    
