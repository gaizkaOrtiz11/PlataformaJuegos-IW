from django.urls import path
from . import views
from django.utils.translation import gettext


urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),

    path(gettext("plataformas/"), views.ListaPlataformasView.as_view(), name="lista_plataformas"),

    path("plataformas/<int:pk>/", views.DetallePlataformaView.as_view(), name="detalle_plataforma"),

    path("juegos/", views.ListaJuegosView.as_view(), name="lista_juegos"),

    path("juegos/<int:pk>/", views.DetalleJuegoView.as_view(), name="detalle_juego"),

    path("jugadores/", views.ListaJugadoresView.as_view(), name="lista_jugadores"),

    path("jugadores/<int:pk>/", views.DetalleJugadorView.as_view(), name="detalle_jugador"),
]