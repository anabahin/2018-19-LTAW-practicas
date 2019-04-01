from django.conf.urls import url
from . import views
from mi_tienda import views

urlpatterns = [
    url(r'^list', views.list_movies),
]
