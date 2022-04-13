from django.urls import path
from .views import RegisterView, LoginView, PostImageView, UserView, ImageView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('post-image/', PostImageView.as_view(), name='post-image'),
    path('images/', ImageView.as_view(), name='images'),
    path('user/', UserView.as_view(), name='user'),
]
