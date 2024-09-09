from django.db.models.signals import post_save
from django.dispatch import receiver
from todo.models import appUser, Profile


@receiver(post_save, sender=appUser)
def create_profile_handler(sender, instance, created, **kwargs):
    if not created:
        return
    
    profile = Profile(user=instance)
    profile.save()