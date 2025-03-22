# Backend/api/views.py
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, LoginSerializer, SignupSerializer

class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']

            # 🚨 Check if username already exists
            if User.objects.filter(username__iexact=username).exists():
                return Response({'error': 'Username is already taken. Please choose another one.'}, status=status.HTTP_400_BAD_REQUEST)

            # 🚨 Check if email already exists
            if User.objects.filter(email__iexact=email).exists():
                return Response({'error': 'An account with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

            # ✅ Create new user if everything is valid
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                'token': token.key,
                'user': UserSerializer(user).data,
            }, status=status.HTTP_201_CREATED)

        # Return errors if the serializer is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        # Get username and password from request
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            # Authenticate user
            user = authenticate(username=username, password=password)
            if user:
                # Generate or retrieve existing token
                token, created = Token.objects.get_or_create(user=user)

                # Return token and user data
                return Response(
                    {
                        'token': token.key,
                        'user': UserSerializer(user).data,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        return Response({'message': 'GET request to Login API'}, status=status.HTTP_200_OK)
    
class UserDetailView(APIView):
    permission_classes = [permissions.AllowAny]  # No token required

    def get(self, request):
        username = request.query_params.get('username')
        password = request.query_params.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user with provided credentials
        user = authenticate(username=username, password=password)
        if user:
            # Return user details if authenticated successfully
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
