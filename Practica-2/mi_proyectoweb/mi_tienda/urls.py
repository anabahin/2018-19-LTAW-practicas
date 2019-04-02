from django.conf.urls import url
from . import views
from mi_tienda import views

urlpatterns = [
    url(r'^$', views.home_view),
    #url(r'^camiseta, views.camiseta)
]
