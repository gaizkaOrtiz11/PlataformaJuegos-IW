@echo off

REM Ir a la carpeta del entorno virtual
cd /d "C:\Users\asher\Desktop\universidad\ingenieria_web\PlataformaJuegos-IW\venv\Scripts"

REM Activar el entorno virtual
call activate

REM Ir a la carpeta del proyecto Django
cd /d "C:\Users\asher\Desktop\universidad\ingenieria_web\PlataformaJuegos-IW\PlataformaJuegos_Project"

REM Ejecutar el servidor
python manage.py runserver
