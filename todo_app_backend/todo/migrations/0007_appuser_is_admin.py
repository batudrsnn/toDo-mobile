# Generated by Django 4.2.15 on 2024-09-05 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0006_remove_profile_id_alter_appuser_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
    ]
