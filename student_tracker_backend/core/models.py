from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrator'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

class Subject(models.Model):
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='subjects', limit_choices_to={'role': 'teacher'})

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=50)
    students = models.ManyToManyField(User, limit_choices_to={'role': 'student'})

    def __str__(self):
        return self.name

class Grade(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    grade = models.IntegerField()
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='given_grades', limit_choices_to={'role': 'teacher'})
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.subject.name} - {self.grade}"
