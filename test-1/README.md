# TEST 1

En esta carpeta se encuentra la resolución del Test 1.
Consiste en un diagrama de red de una aplicación web en AWS, con frontend en Js y backend con una base de datos relacional y una no relacional. A su vez, el backend consume 2 microservicios externos.

![Diagrama de red de una aplicación web](https://raw.githubusercontent.com/rodrigoAguirre1/devops-challenge/master/test-1/diagrama-de-red-app.png)

Se utiliza el servicio Route53 para crear y administrar un nombre de dominio propio. Se crea una Hosted zone y dentro de ella los distintos Record names (nombres de dominio y subdominio) que van a redirigir a la distribución de CloudFront.

CloudFront se utiliza para la distribución del contenido de la aplicación web, apuntando al bucket S3 donde está almacenado el frontend y al backend que corre en instancias EC2 a través del ALB. Esto mejora el rendimiento ya que a partir de una primera solicitud CloudFront almacena el contenido en la Edge Location más cercana a la ubicación del usuario y la próxima vez que un usuario haga la misma solicitud y se encuentre en el radio de esa Edge Location, la latencia será menor (comparado con tener que hacer la solicitud directamente al bucket S3).

El ALB se encarga de distribuir la carga entre las instancias EC2 y de la administración de las mismas (escalado, comprobación de estado).

(El ALB es el encargado de distribuir el tráfico entrante de la aplicación entre las instancias EC2. Como se esperan cargas variables, se utiliza un Auto Scaling group que administra automaticamente las instancias EC2, por ejemplo, en base a métricas del ALB cómo el recuentode soliticudes por destino, para escalar el número de instancias a medida que fluctúa la demanda. Al asociar el Load Balancer al ASG, las instancias lanzadas por el ASG se registran automáticamente en el Load Balancer.)

Las instancias EC2 tienen acceso a dos bases de datos: Aurora, base de datos relacional completamente administrada (escalado, backups automáticos, alta disponibilidad y tolerancia a fallos), y DynamoDB, base de datos no relacional también completamente administrada. DynamoDB es serverless (escala automáticamente bajo demanda) y en Aurora es opcional.

Por último, el backend consume microservicios externos, por lo que se utilizan Nat Gateways en las subnets públicas para darles acceso a internet de forma segura (las instancias EC2 pueden conectarse a internet pero desde internet no se puede iniciar una conexión con las instancias). Esto lo logra cambiando la dirección IP de la instancia por la dirección IP de la NAT Gateway.

Route table de una subnet privada:

| Destination | Target |
| --- | --- |
| 0.0.0.0/0 | ALB????? |
| CIDR VPC | local |
| CIDR Microservice1 | nat-gateway-id |
| CIDR Microservice2 | nat-gateway-id |
| CIDR DynamoDB | vpc-endpoint-id |


El security group para las instancias EC2 sería:

Inbound rules:

| Source | Protocol | Port |
| --- | --- | --- |
| App Load Balancer SG ID | HTTP/HTTPS | LB port range |

Outbound rules:

| Destination | Protocol | Port |
| --- | --- | --- |
| DynamoDB SG ID | TCP | DynamoDB port range |
| Aurora SG ID | TCP | Aurora port range |
| Microservice1 SG ID | TCP | Microservice1 port range |
| Microservice2 SG ID | TCP | Microservice2 port range |


### Alternativas:

El backend se puede correr utilizando Lambda en vez de instancias EC2: solución serverless. Se reemplazaría el load balancer y las instancias EC2 por un API Gateway que enruta las solicitudes a la función Lambda, que tendría el mismo acceso a las bases de datos y microservicios externos.

Como alternativa para DynamoDb se puede utilizar DocumentDB, también completamente administrado y compatible con MongoDB.

No se tiene información respecto a los microservicios externos, pero si se encontraran, por ejemplo en otra VPC, se podría establecer un VPC peering connection de manera que se comuniquen mediante una IP privada, evitando pasar por redes de internet públicas (conexión más segura) y también reduciendo el coste frente a una NAT Gateway.

