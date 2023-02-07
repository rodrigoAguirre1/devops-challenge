# TEST 2

En esta carpeta se encuentra la resolución del Test 2.
Se tienen las carpetas con el código de backend y de frontend, y dentro sus respectivos Dockerfiles para correr en modo desarrollador o en modo producción.

## Ejemplo modo producción:

En el caso del frontend, el Dockerfile primero importa los archivos del código del front, instala las dependencias y realiza un build de la app. Luego se copian los archivos del build en nginx, que es el encargado de hostear la página.

En el caso del backend, el Dockerfile primero importa requirements.txt e instala las dependencias del back. Luego copia todo el código que va a ser hosteado por gunicorn.

Por último, el docker-compose-prod contiene los dos servicios backend y frontend. Este archivo permite definir y ejecutar la aplicación web dockerizada en dos contenedores.

### Instrucciones para deploy en PC local:

#### Modo desarrollo:

Desde la carpeta root donde se encuentran las carpetas backend y frontend, y el archivo docker-compose-dev.yml se ejecutan los siguientes comandos:

1- Se realiza un build al archivo docker-compose-dev.yml para crear las imágenes con los servicios: 
    
    $ docker compose -f docker-compose-dev.yml build

2- Se inician los servicios a partir de las imágenes creadas con el siguiente comando:
   
    $ docker compose -f docker-compose-dev.yml up

Se accede a la app desde el navegador en: localhost

Se accede al backend desde el navegador en: localhost:8000

Para detener y remover los servicios se utiliza el siguiente comando:
   
    $ docker compose -f docker-compose-dev.yml down

Para ver los containers que se estan ejecutando se utiliza el siguiente comando:
   
    $ docker compose ps

#### Modo producción:

Desde la carpeta root donde se encuentran las carpetas backend y frontend, y el archivo docker-compose-prod.yml se ejecutan los siguientes comandos:

1- Se realiza un build al archivo docker-compose-dev.yml para crear las imágenes con los servicios: 
    
    $ docker compose -f docker-compose-prod.yml build

2- Se inician los servicios a partir de las imágenes creadas con el siguiente comando:
   
    $ docker compose -f docker-compose-prod.yml up

Se accede a la app desde el navegador en: localhost

Se accede al backend desde el navegador en: localhost:8000

Para detener y remover los servicios se utiliza el siguiente comando:
   
    $ docker compose -f docker-compose-prod.yml down

Para ver los containers que se estan ejecutando se utiliza el siguiente comando:
   
    $ docker compose ps




### Instrucciones para deploy en la nube:

Desde la carpeta root donde se encuentran las carpetas backend y frontend, y el archivo docker-compose.yml se ejecutan los siguientes comandos:

1- Se realiza un build al archivo docker-compose.yml para crear las imágenes con los servicios: 
    
    $ docker compose build

2- Se pushean las dos imágenes a un repositorio de ECR (Cuando se crea el repositorio en la consola se muestran los comandos para pushear imágenes dentro).

3- Se utiliza un clúster de ECS para administrar los contenedores. Se crean dos instancias dentro del clúster (En una subnet publica, dentro de una VPC) y se les asignan tareas distintas, tal que se tengan dos contenedores corriendo las imágenes pusheadas a ECR.

4- En el security group de cada instancia se modifican las Inbound rules para permitir el acceso de cualquier ip por el puerto en el que se encuentra expuesta la imagen (Por ejemplo, en este caso el backend está expuesto en el puerto 8000).

5- Se accede al backend desde el navegador en: IPpúblicaEC2:8000