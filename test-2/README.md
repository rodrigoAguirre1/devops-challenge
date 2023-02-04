# TEST 2

En esta carpeta se encuentra la resolución del Test 2.
Se tienen las carpetas con el código de backend y de frontend, y dentro sus respectivos Dockerfiles.

En el caso del frontend, el Dockerfile primero importa los archivos del código del front, instala las dependencias y realiza un build de la app. Luego se copian los archivos del build en nginx, que es el encargado de hostear la página.

En el caso del backend, el Dockerfile primero importa requirements.txt e instala las dependencias del back. Luego copia todo el código que va a ser hosteado por gunicorn.

Por último, el docker-compose contiene los dos servicios backend y frontend. Este archivo permite definir y ejecutar la aplicación web dockerizada en dos contenedores.

### Instrucciones:

Desde la carpeta root donde se encuentran las carpetas backend y frontend, y el archivo docker-compose.yml se ejecutan los siguientes comandos:

1- Se realiza un build al archivo docker-compose.yml para crear las imágenes con los servicios: 
    
    $ docker compose build

2- Se inician los servicios a partir de las imágenes creadas con el siguiente comando:
   
    $ docker compose up

Se accede a la app desde el navegador en: localhost

Se accede al backend desde el navegador en: localhost:8000

Para detener y remover los servicios se utiliza el siguiente comando:
   
    $ docker compose down

Para ver los containers que se estan ejecutando se utiliza el siguiente comando:
   
    $ docker compose ps
