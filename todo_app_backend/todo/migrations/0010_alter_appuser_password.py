# Generated by Django 4.2.16 on 2024-09-17 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0009_remove_appuser_is_admin_alter_todo_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appuser',
            name='password',
            field=models.CharField(max_length=30),
        ),
    ]
