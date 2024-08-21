from django.urls import path
from . import views

urlpatterns = [
    path('todo/', views.ToDoListView.as_view()),
    path('todo/<int:user_id>', views.ToDoListView.as_view()),
    path('todo-detail/<int:user_id>/<int:todo_id>/', views.ToDoListDetailView.as_view()),
]