# Imagen de python donde se ejecuta este Dockerfile.
FROM python:3.8-alpine

# La información del comando de la consola va directamente
# al terminal, y no se almacena en el búfer.
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Se crea un directorio en el contenedor, donde se va a 
# copiar el código e instalar las dependencias.
WORKDIR /backend

# Se copian todos los archivos que se encuentran en la carpeta 
# backend dentro del contenedor (misma carpeta donde se encuentra
# el Dockerfile).
COPY . .

# Se instalan las dependencias
RUN apk add --virtual .build-deps --no-cache gcc python3-dev musl-dev && \
        pip install --no-cache-dir -r requirements.txt && \
        apk --purge del .build-deps