from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save


class User(AbstractUser):
    username = models.CharField(max_length = 50, blank = False, unique = True)
    last_name = models.CharField(max_length = 20)
    
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    def __str__(self):
      return "{}".format(self.username)
    
    
class Profile(models.Model):
    user = models.OneToOneField('todo.User', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=200)
    image = models.ImageField(upload_to="user_images", default="default.jpg")

class ToDo(models.Model):
    user = models.ForeignKey('todo.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=100, default="Enter a title..")
    details = models.CharField(max_length=1000, default="Enter a detail..")
    completed = models.BooleanField(default=False)
    
    def __str__(self):
       return self.title[:30]
    
  
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    Profile.objects.create(user=instance)
    
