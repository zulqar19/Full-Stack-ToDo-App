from django.db import models
from django.contrib.auth.models import User
# from ..backend.settings import 

# Create your models here.

class Task(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
