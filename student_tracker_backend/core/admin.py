from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Subject, Group, Grade

# Админка для пользователя
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Role', {'fields': ('role',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'role')}
        ),
    )
    search_fields = ('username', 'email')
    ordering = ('username',)

    def has_delete_permission(self, request, obj=None):
        return True  # Разрешаем удаление

# Админка для группы
class GroupAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    filter_horizontal = ('students',)  # для выбора студентов в группе

# Админка для предмета
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_teacher_name')  # Используем метод для отображения имени преподавателя
    search_fields = ('name', 'teacher__username')

    def get_teacher_name(self, obj):
        return obj.teacher.username if obj.teacher else None
    get_teacher_name.short_description = 'Teacher'  # Подпись для этого столбца в админке

# Админка для оценок
class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'grade', 'teacher', 'created_at')
    search_fields = ('student__username', 'subject__name', 'teacher__username')

# Регистрируем модели в админке
admin.site.register(User, CustomUserAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(Grade, GradeAdmin)
