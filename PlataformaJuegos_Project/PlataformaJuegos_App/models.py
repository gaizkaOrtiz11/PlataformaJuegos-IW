from django.db import models

# Create your models here.
class Plataforma(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    companyia = models.CharField(max_length=50, blank=True, null=True)
    fecha_lanzamiento = models.DateField()
    logo = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.nombre