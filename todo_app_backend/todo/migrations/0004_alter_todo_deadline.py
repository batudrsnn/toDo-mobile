# Generated by Django 4.2.15 on 2024-09-02 22:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_alter_appuser_username_alter_todo_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='deadline',
            field=models.DateField(default=datetime.date(2024, 9, 2)),
        ),
    ]
