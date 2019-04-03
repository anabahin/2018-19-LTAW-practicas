# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from mi_tienda.models import Camiseta_Futbol

from mi_tienda.models import Chaqueta_Chandal

from mi_tienda.models import Abrigo


# Create your views here.
def home_view(request):
    return render(request, "index.html", {})

def camiseta(request):
    todas_camisetas = Camiseta_Futbol.objects.all()
    return render(request, "general.html", {'objetos': camiseta})

def chandal(request):
    todos_chandal = Camiseta_Futbol.objects.all()
    return render(request, "general.html", {'objetos': chandal})

def Abrigos(request):
    todos_abrigos = Camiseta_Futbol.objects.all()
    return render(request, "general.html", {'objetos': Abrigos})
