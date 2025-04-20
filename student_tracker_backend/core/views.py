from rest_framework import serializers, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from rest_framework.permissions import IsAuthenticated
from .models import User, Subject, Group, Grade
from .serializers import UserSerializer, SubjectSerializer, GroupSerializer, GradeSerializer
from .permissions import IsTeacher
from rest_framework.permissions import IsAdminUser

# Вью для регистрации
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Вью для регистрации

class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Registration successful"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# Вью для получения данных о пользователе
class UserDataView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'is_teacher': user.groups.filter(name='Teachers').exists(),  # Проверка роли
        })

# UserViewSet для работы с пользователями
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # Ожидается, что доступ будет только для администраторов

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [IsAuthenticated, IsTeacher]
