# Backend/api/urls.py
from django.urls import path
from .views import LoginView, SignupView, UserDetailView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('user-details/', UserDetailView.as_view(), name='user-details'),
]
