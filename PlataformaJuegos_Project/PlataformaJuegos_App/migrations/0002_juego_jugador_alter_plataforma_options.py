from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PlataformaJuegos_App', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Juego',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('companyia', models.CharField(blank=True, max_length=50, null=True)),
                ('fecha_lanzamiento', models.DateField()),
                ('logo', models.URLField(blank=True, null=True)),
                ('PEGI', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Juego',
                'verbose_name_plural': 'Juegos',
            },
        ),
        migrations.CreateModel(
            name='Jugador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('apodo', models.CharField(max_length=100)),
                ('foto_cara', models.URLField(blank=True, null=True)),
                ('descripcion', models.CharField(blank=True, max_length=800, null=True)),
                ('es_profesional', models.BooleanField()),
                ('equipo', models.CharField(blank=True, max_length=50, null=True)),
                ('logo_equipo', models.URLField(blank=True, null=True)),
                ('anyo_nacimiento', models.DateField()),
            ],
            options={
                'verbose_name': 'Jugador',
                'verbose_name_plural': 'Jugadores',
            },
        ),
        migrations.AlterModelOptions(
            name='plataforma',
            options={'verbose_name': 'Plataforma', 'verbose_name_plural': 'Plataformas'},
        ),
    ]
