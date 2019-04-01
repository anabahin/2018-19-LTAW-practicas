# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.

from mi_tienda.models import MovieList

from mi_tienda.models import Movie



admin.site.register(MovieList)

admin.site.register(Movie)
