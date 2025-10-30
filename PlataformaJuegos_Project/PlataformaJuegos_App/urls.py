from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name = "home"),

    path('plataformas/', views.lista_plataformas, name='lista_plataformas')
]