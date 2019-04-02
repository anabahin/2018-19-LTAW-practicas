# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Camiseta (models.Model):
    name = models.CharField('Nombre de la camiseta', max_length=50)
    #image = models.ImageField(upload_to = "static")
    marca = models.CharField('Marca de la camiseta', max_length = 50)
    precio = models.FloatField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name

class Chaqueta_Chandal (models.Model):
    name = models.CharField('Nombre de la chaqueta', max_length=50)
    #image = models.ImageField(upload_to = "static")
    marca = models.CharField('Marca de la chaqueta', max_length = 50)
    precio = models.FloatField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name


class Abrigo (models.Model):
    name = models.CharField('Nombre del abrigo', max_length=50)
    #image = models.ImageField(upload_to = "static")
    marca = models.CharField('Marca del abrigo', max_length = 50)
    precio = models.FloatField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name
