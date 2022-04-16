from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import Http404
from .serializers import RegisterSerializer, ImageSerializer, UserSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from  rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from .models import Image


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        print(request)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        status_code = status.HTTP_201_CREATED
        response = {
            'success': 'True',
            'status code': status_code,
            'message': 'User registered  successfully',
        }

        return Response(response, status=status_code)


class LoginView(APIView):
    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")
        if username is None or password is None:
            return Response({'error': "Please provide both username and password"}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'Wrong Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class PostImageView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser ]
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

class ImageView(generics.ListAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = ImageSerializer

    def get_queryset(self):
        user = self.request.user
        return Image.objects.filter(owner=user)


class UserView(APIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = UserSerializer

    def get_queryset(self):
        id = self.request.user.id
        return User.objects.get(id=id)

    def get(self, request):
        user = self.get_queryset()
        serializer = self.serializer_class(user)
        return Response(serializer.data)
