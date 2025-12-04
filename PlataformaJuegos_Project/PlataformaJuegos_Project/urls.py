from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns


# URLs que NO tendrán prefijo de idioma
urlpatterns = [
    path('admin/', admin.site.urls),
]

# URLs que SÍ tendrán prefijo de idioma
urlpatterns += i18n_patterns(
    path("", include("PlataformaJuegos_App.urls"))
)