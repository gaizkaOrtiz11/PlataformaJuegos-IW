from django.shortcuts import render, HttpResponse
from .models import Plataforma

# Create your views here.
def home(request):
    return HttpResponse("Hello, world!")

def lista_plataformas(request):
    plataformas = Plataforma.objects.order_by("fecha_lanzamiento")
    nombres_plataformas =','.join([plataforma.companyia for plataforma in plataformas])
    return render(request, "plataforma/lista_plataformas.html", {"plataformas": plataformas})

def detalle_plataforma(request, plataforma_id):
    plataforma = Plataforma.objects.get(id=plataforma_id)
    nombre = plataforma.nombre
    logo = plataforma.logo.url if plataforma.logo else None
    companyia = plataforma.companyia
    return render(request, "plataforma/detalle_plataforma.html", {"nombre": nombre, "logo": logo, "companyia": companyia})
