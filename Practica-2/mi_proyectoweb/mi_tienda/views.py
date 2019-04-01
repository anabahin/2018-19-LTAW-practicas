# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from .models import(
    MovieList,
    Movie
)

# Create your views here.

def list_movies(request):
    movies = Movie.objects.all().order_by('name')
    context = {
        'movies' : movies
    }
    return render(request, 'list.html', context)
