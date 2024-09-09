from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *  # Import your viewset

# Create a router and register the viewset
router = DefaultRouter()
router.register(r'todos', toDoViewSet)
router.register(r'appUsers', appUserViewSet)


urlpatterns = [
    path('', include(router.urls)),  # Include the router-generated URLs
]
