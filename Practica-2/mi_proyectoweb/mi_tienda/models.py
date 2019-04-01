# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator
from django.db import models

User = get_user_model()

# Create your models here.
class MovieList (models.Model):
    name = models.CharField('Nombre de la lista', max_length=50, unique = True)
    owner = models.ForeignKey(User)
    movies = models.ManyToManyField('Movie')

    def __str__(self):
        return "'{list}' de {owner}".format(
            list = self.name,
            owner = self.owner.get_full_name()
        )

class Movie(models.Model):
    name = models.CharField('Nombre de la pelicula', max_length = 100)
    release_date = models.DateField('Fecha de estreno')
    rate_count = models.PositiveIntegerField('Veces que se ha calificado la pelicula', blank = True, null = True)
    rate = models.PositiveIntegerField('Total de calificacion de la pelicula', blank = True, null = True )
    tags = models.ManyToManyField('Tag')
    studio = models.ForeignKey('Studio')
    director = models.ForeignKey('Director')

    def average_rate(self):

        if self.rate_count == 0 :
            return 0
        else:
            return rate/rate_count

    def __str__(self):
        return self.name

class Tag(models.Model):

    name = models.CharField('Nombre del tag', max_length = 20, unique = True)

    def __str__(self):
        return self.name

class Studio(models.Model):

    name = models.CharField( max_length = 30, unique = True)

    def __str__(self):
        return self.name

class Director(models.Model):

    first_name = models.CharField(max_length = 40)
    last_name = models.CharField(max_length = 40)

    def get_full_name(self):
        return "{first_name} {last_name}".format(
            first_name = self.first_name,
            last_name = self.last_name
        )
    def __str__(self):
        return self.get_full_name()    
