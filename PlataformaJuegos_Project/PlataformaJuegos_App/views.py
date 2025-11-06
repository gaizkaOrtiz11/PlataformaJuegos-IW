from django.shortcuts import render, HttpResponse
from .models import Plataforma, Juego, Jugador

# Create your views here.
def home(request):
    return render(request, "index.html")


def lista_plataformas(request):
    plataformas = Plataforma.objects.order_by("fecha_lanzamiento")
    nombres_empresas =','.join([plataforma.companyia for plataforma in plataformas if plataforma.companyia])
    return render(request, "plataforma/lista_plataformas.html", {"plataformas": plataformas, "nombres_empresas": nombres_empresas})

def detalle_plataforma(request, plataforma_id):
    plataforma = Plataforma.objects.get(id=plataforma_id)
    nombre = plataforma.nombre
    logo = plataforma.logo if plataforma.logo else None
    companyia = plataforma.companyia
    return render(request, "plataforma/detalle_plataforma.html", {"nombre": nombre, "logo": logo, "companyia": companyia})


def lista_juegos(request):
    juegos = Juego.objects.order_by("nombre")
    nombres_empresas = ','.join([juego.companyia for juego in juegos if juego.companyia])
    return render(request, "juego/lista_juegos.html", {"juegos": juegos, "nombres_empresas": nombres_empresas})

def detalle_juego(request, juego_id):
    juego = Juego.objects.get(id=juego_id)
    nombre = juego.nombre
    logo = juego.logo if juego.logo else None
    companyia = juego.companyia
    pegi = juego.PEGI
    return render(request, "juego/detalle_juego.html", {"nombre": nombre, "logo": logo, "companyia": companyia, "pegi": pegi})


def lista_jugadores(request):
    jugadores = Jugador.objects.order_by("apodo")
    apodos = ','.join([jugador.apodo for jugador in jugadores if jugador.apodo])
    return render(request, "jugador/lista_jugadores.html", {"jugadores": jugadores, "apodos": apodos})

def detalle_jugador(request, jugador_id):
    jugador = Jugador.objects.get(id=jugador_id)
    nombre = jugador.nombre
    apodo = jugador.apodo
    foto_cara = jugador.foto_cara
    descripcion = jugador.descripcion
    es_profesional = jugador.es_profesional
    equipo = jugador.equipo
    logo_equipo = jugador.logo_equipo if jugador.logo_equipo else None
    anyo_nacimiento = jugador.anyo_nacimiento
    return render(request, "jugador/detalle_jugador.html", {
        "nombre": nombre,
        "apodo": apodo,
        "descripcion": descripcion,
        "foto_cara": foto_cara,
        "es_profesional": es_profesional,
        "equipo": equipo,
        "logo_equipo": logo_equipo,
        "año_nacimiento": anyo_nacimiento
    })
