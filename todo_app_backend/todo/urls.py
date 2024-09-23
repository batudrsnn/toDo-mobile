from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *  # Import your viewset
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# Create a router and register the viewset
router = DefaultRouter()
router.register(r'todos', toDoViewSet)
router.register(r'appUsers', appUserViewSet)


urlpatterns = [
    path('', include(router.urls)),  # Include the router-generated URLs
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


""" TOKEN YOLLA LOGIN DE """