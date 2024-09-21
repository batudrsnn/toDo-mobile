from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets 
    list_display = ['username', 'email', 'is_staff']

admin.site.register(appUser, CustomUserAdmin)
admin.site.register([toDo, Profile])

