# from rest_framework import serializers
# from django.contrib.auth.models import User


# class UserRegistrationSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password', 'phone']

from rest_framework import serializers
from django.contrib.auth.models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']

