# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-04-04 10:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0007_auto_20190403_1647'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abrigo',
            name='image',
            field=models.ImageField(default=0, upload_to='static'),
        ),
        migrations.AlterField(
            model_name='camiseta_futbol',
            name='image',
            field=models.ImageField(default=0, upload_to='static'),
        ),
        migrations.AlterField(
            model_name='chaqueta_chandal',
            name='image',
            field=models.ImageField(default=0, upload_to='static'),
        ),
    ]