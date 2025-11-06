from django.shortcuts import render, HttpResponse
from .models import Plataforma, Juego, Jugador

# Create your views here.
def home(request):
    return render(request, "index.html")


def lista_plataformas(request):
    plataformas = Plataforma.objects.order_by("fecha_lanzamiento")
    nombres_empresas =','.join([plataforma.companyia for plataforma in plataformas if plataforma.companyia])
    return render(request, "plataforma/lista_plataformas.html", {"plataformas": plataformas, "nombres_empresas": nombres_empresas})

def detalle_plataforma(request, pk):
    plataforma = Plataforma.objects.get(id=pk)
    return render(request, "plataforma/detalle_plataformas.html", {"plataforma": plataforma}
    )

def lista_juegos(request):
    juegos = Juego.objects.order_by("nombre")
    nombres_empresas = ','.join([juego.companyia for juego in juegos if juego.companyia])
    return render(request, "juego/lista_juegos.html", {"juegos": juegos, "nombres_empresas": nombres_empresas})

def detalle_juego(request, pk):
    juego = Juego.objects.get(id=pk)
    return render(request, "juego/detalle_juegos.html", {"juego": juego})


def lista_jugadores(request):
    jugadores = Jugador.objects.order_by("apodo")
    apodos = ','.join([jugador.apodo for jugador in jugadores if jugador.apodo])
    return render(request, "jugador/lista_jugadores.html", {"jugadores": jugadores, "apodos": apodos})

def detalle_jugador(request, pk):
    jugador = Jugador.objects.get(id=pk)
    return render(request, "jugador/detalle_jugador.html", {"jugador": jugador})
