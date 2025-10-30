from django.db import models


class Plataforma(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    companyia = models.CharField(max_length=50, blank=True, null=True)
    fecha_lanzamiento = models.DateField()
    logo = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Plataforma"
        verbose_name_plural = "Plataformas"

    def __str__(self):
        return self.nombre
    
class Juego(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    companyia = models.CharField(max_length=50, blank=True, null=True)
    fecha_lanzamiento = models.DateField()
    logo = models.URLField(blank=True, null=True)
    PEGI = models.IntegerField(max_length=2, blank=True, null=True)  # Edad recomendad

    class Meta:
        verbose_name = "Plataforma"
        verbose_name_plural = "Plataformas"

    def __str__(self):
        return self.nombre
    
class Jugador(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    apodo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=800, blank=True, null=True)
    es_profesional = models.BooleanField()
    equipo = models.CharField(max_length=50, blank=True, null=True)
    logo_equipo = models.URLField(blank=True, null=True)
    año_nacimiento = models.DateField()

    class Meta:
        verbose_name = "Jogador"
        verbose_name_plural = "Jogadores"

    def __str__(self):
        return self.apodo