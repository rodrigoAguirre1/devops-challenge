# TEST 3

En esta carpeta se encuentra la resolución del Test 3.

El Dockerfile genera una imagen de nginx que contiene el index.html que va a hostear.

El CI/CD se crea con GitHub Actions. Al pushear un cambio del archivo index.html en el repositorio de GitHub, se triggerea la action que genera una nueva imagen del index.html y la pushea en el repositorio de imágenes de AWS, ECR.

Se eligió ECS como plataforma para correr el contenedor, por lo que el último paso en el código de GitHub Actions es crear una definición nueva de la tarea que ejecuta la imagen, utilizando la nueva imagen cargada en ECR.

El archivo de GitHub Actions se encuentra en el root del repositorio, en '.github/workflows/deploy.yml'.