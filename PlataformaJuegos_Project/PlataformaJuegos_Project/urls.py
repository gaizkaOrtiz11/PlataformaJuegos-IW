"""
URL configuration for PlataformaJuegos_Project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# project_name/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns

# URLs que no se van a traducir 
urlpatterns = [
    path('admin/', admin.site.urls),
]

# URLs que SÍ tendrán prefijo de idioma:
# Serán accesibles en /es/plataformaApp/, /en/plataformaApp/, etc.
urlpatterns += i18n_patterns(
    path("plataformaApp/", include("PlataformaJuegos_App.urls")),
    path("plataformas/", include("PlataformaJuegos_App.urls")),
    # Puedes añadir un path vacío para la raíz de tu app:
    # path("", include("PlataformaJuegos_App.urls")), 
)