from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Image


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password',)
        extra_kwargs = {
            'password': {'write_only': True},
            
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )
        
        user.set_password(validated_data['password'])
        user.save()

        Token.objects.create(user=user)

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username',]

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('owner', 'image',)
