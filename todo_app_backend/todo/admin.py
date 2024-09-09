from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_admin',)}),  # Add is_admin to the admin interface
    )
    list_display = ['username', 'email', 'is_admin', 'is_staff']

admin.site.register(appUser, CustomUserAdmin)
admin.site.register([toDo, Profile])

