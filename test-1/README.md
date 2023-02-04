# TEST 1

En esta carpeta se encuentra la resolución del Test 1.
Consiste en un diagrama de red de una aplicación web en AWS, con frontend en Js y backend con una base de datos relacional y una no relacional. A su vez, el backend consume 2 microservicios externos.

<!-- ![Diagrama de red de una aplicación web](https://raw.githubusercontent.com/rodrigoAguirre1/devops-challenge/master/test-1/diagrama-red-app.png) -->

El browser primero realiza una request a la distribución de CloudFront y se trae el archivo estático Js del bucket S3, carga el frontend estático y realiza requests al backend a través del Application Load Balancer.

Se utiliza el servicio Route53 para crear y administrar un nombre de dominio propio. Se crea una Hosted zone y dentro de ella los distintos Record names (nombres de dominio y subdominio) que van a redirigir a la distribución de CloudFront y al Application Load Balancer. 

CloudFront se utiliza para la distribución del contenido estático de la aplicación web, apuntando al bucket S3 donde está almacenado el frontend (Js). Esto mejora el rendimiento ya que a partir de una primera solicitud CloudFront almacena el contenido en la Edge Location más cercana a la ubicación del usuario y la próxima vez que un usuario haga la misma solicitud y se encuentre en el radio de esa Edge Location, la latencia será menor (comparado con tener que hacer la solicitud directamente al bucket S3).

El ALB es el encargado de distribuir el tráfico entrante al backend, entre las instancias EC2. Como se esperan cargas variables, se utiliza un Auto Scaling group que administra automaticamente las instancias EC2, por ejemplo, en base al consumo de cpu de las instancias. Se asocia tanto el ALB como el ASG al target group, donde el ASG registra automáticamente las instancias.

En este caso, el ALB se encarga de la encriptación/desencriptación de los paquetes mediante el servicio AWS Certificate Manager, brindando una conexión segura al cliente y desencriptando los paquetes del lado del servidor.

Las instancias EC2 tienen acceso a dos bases de datos: Aurora, base de datos relacional completamente administrada (escalado, backups automáticos, alta disponibilidad y tolerancia a fallos), y DynamoDB, base de datos no relacional también completamente administrada. DynamoDB es serverless (escala automáticamente bajo demanda) y en Aurora opcionalmente se puede optar por serverless.

Por último, el backend consume microservicios externos, por lo que se utilizan Nat Gateways en las subnets públicas para darles acceso a internet de forma segura (las instancias EC2 pueden conectarse a internet pero desde internet no se puede iniciar una conexión con las instancias).

Se utiliza CloudWatch para monitorear y recopilar datos de los recursos implementados. Por ejemplo, para analizar la cantidad de request que presenta la aplicación en un tiempo determinado y así verificar si la implementación del backend tiene sentido o conviene una solución serverless que ejecute recursos únicamente cuando se reciben requests.

### Aclaraciones del diagrama:

Cada Route Table de las subnets privadas va a tener como target al Nat Gateway de la AZ donde se encuentra. Es una relación de compromiso costo/rendimiento, ya que al utilizar una NAT Gateway dentro de la misma AZ se tiene un acceso más directo a internet, en comparación a utilizar NAT Gateways de otras AZs, porque se debería mandar la request desde la AZ donde se encuentra la instancia hacia la AZ donde se encuentra la NAT Gateway para poder acceder a internet.

El acceso a DynamoDB se regula mediante IAM, por lo que a las instancias EC2 se les debe asignar un IAM role con los permisos para acceder a las tablas de DynamoDb.

### Algunas alternativas:

El backend se puede correr utilizando Lambda dentro de la VPC, en vez de instancias EC2: solución serverless. Se reemplazaría el load balancer y las instancias EC2 por un API Gateway que enruta las solicitudes a la función Lambda (la cuál corre el backend), que tendría el mismo acceso a las bases de datos y microservicios externos.

No se tiene información respecto a los microservicios externos, pero si se encontraran, por ejemplo en otra VPC, se podría establecer un VPC peering connection de manera que se comuniquen mediante una IP privada, evitando pasar por redes de internet públicas (conexión más segura) y también reduciendo el costo frente a una NAT Gateway.

Dependiendo del tipo de motor de base de datos que se vaya a ejecutar en la instancia de base de datos, se puede optar por una base de dato no relacional como DocumentDB o relacional como RDS.