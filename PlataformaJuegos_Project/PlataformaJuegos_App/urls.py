from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name = "home"),

    path('plataformas/', views.lista_plataformas, name='lista_plataformas'),

    path('plataformas/<int:pk>', views.detalle_plataforma, name='detalle_plataforma'),

    path('juegos/', views.lista_juegos, name='lista_plataformas'),

    path('juegos/<int:pk>', views.detalle_juego, name='detalle_juego'),

    path('jugadores/', views.lista_jugadores, name='lista_plataformas'),

    path('jugadores/<int:pk>', views.detalle_jugador, name='detalle_jugador')
]