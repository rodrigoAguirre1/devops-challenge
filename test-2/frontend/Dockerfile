# Se ejecuta una imagen de node que permite buildear el fronted.
FROM node:18-alpine AS builder

# Se crea un directorio en el contenedor, donde se va a 
# copiar el código del frontend.
WORKDIR /frontend

# Se copian todos los archivos que se encuentran en la carpeta 
# frontend dentro del contenedor (misma carpeta donde se encuentra
# el Dockerfile).
COPY . .

# Se ejecutan los comandos para instalar las dependencias y
# y buildear el front. Por defecto, npm run build almacena 
# los archivos en una carpeta llamada "build" dentro del directorio 
# donde se encuentra.
RUN npm i && npm run build

# Se ejecuta una imagen de nginx.
FROM nginx:1.22-alpine

# Se copia el archivo de configuración de nginx (extiende 
# la configuración que nginx tiene que ejecutar) dentro del
# contenedor, dentro de una carpeta que trae por default
# la imagen de nginx.
# En este caso sirve al cliente el frontend y el backend.
COPY ./nginx/nginx-setup.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/build /usr/share/nginx/html