from django.urls import path
from . views import *

urlpatterns = [
    path('' , ApiOverView, name='api-overview'),
    path('task-list/' , TaskList, name='task-list'),
    path('detail-view/<str:pk>/' , DetailView, name='detail-view'),
    path('task-create/' , TaskCreate, name='task-create'),
    path('task-update/<str:pk>/' , TaskUpdate, name='task-update'),
    path('task-delete/<str:pk>/' , TaskDelete, name='task-delete'),
]