# Se utiliza una imagen de nginx para cargarle el index.html 
# que va a hostear.
FROM nginx:1.22-alpine

# Se copia el archivo index.html dentro de la
# imagen de nginx.
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80 