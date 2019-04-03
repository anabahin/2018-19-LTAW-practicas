# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from mi_tienda.models import Camiseta_Futbol

from mi_tienda.models import Chaqueta_Chandal

from mi_tienda.models import Abrigo

# Register your models here.

admin.site.register(Camiseta_Futbol)

admin.site.register(Chaqueta_Chandal)

admin.site.register(Abrigo)
