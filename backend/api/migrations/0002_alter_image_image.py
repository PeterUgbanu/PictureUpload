# Generated by Django 3.2.6 on 2022-04-06 21:40

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.ImageField(upload_to=api.models.upload_to, validators=[api.models.image_size]),
        ),
    ]