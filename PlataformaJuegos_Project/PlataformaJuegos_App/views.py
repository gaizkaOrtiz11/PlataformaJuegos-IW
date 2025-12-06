from django.views import View
from django.views.generic import ListView, DetailView, TemplateView
from django.shortcuts import render
from .models import Plataforma, Juego, Jugador


class HomeView(TemplateView):
    template_name = "index.html"


class ListaPlataformasView(ListView):
    model = Plataforma
    template_name = "plataforma/lista_plataformas.html"
    context_object_name = "plataformas"
    ordering = "fecha_lanzamiento"
    paginate_by = 8

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        plataformas = self.get_queryset()
        context["nombres_empresas"] = ','.join([p.companyia for p in plataformas if p.companyia])
        return context


class DetallePlataformaView(DetailView):
    model = Plataforma
    template_name = "plataforma/detalle_plataformas.html"
    context_object_name = "plataforma"
    pk_url_kwarg = "pk"


class ListaJuegosView(ListView):
    model = Juego
    template_name = "juego/lista_juegos.html"
    context_object_name = "juegos"
    ordering = "nombre"
    paginate_by = 8

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        juegos = self.get_queryset()
        context["nombres_empresas"] = ','.join([j.companyia for j in juegos if j.companyia])
        try:
            juego = Juego.objects.get(id=1)
            context["plataformas"] = juego.plataformas.all()
        except Juego.DoesNotExist:
            context["plataformas"] = []
        return context


class DetalleJuegoView(DetailView):
    model = Juego
    template_name = "juego/detalle_juegos.html"
    context_object_name = "juego"
    pk_url_kwarg = "pk"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["plataformas"] = self.object.plataformas.all()
        return context


class ListaJugadoresView(ListView):
    model = Jugador
    template_name = "jugador/lista_jugadores.html"
    context_object_name = "jugadores"
    ordering = "apodo"
    paginate_by = 8

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        jugadores = self.get_queryset()
        context["apodos"] = ','.join([j.apodo for j in jugadores if j.apodo])
        return context


class DetalleJugadorView(DetailView):
    model = Jugador
    template_name = "jugador/detalle_jugador.html"
    context_object_name = "jugador"
    pk_url_kwarg = "pk"
