En esta carpeta se encuentra la resolución del Test 1.
Consiste en un diagrama de red de una aplicación web en AWS, con frontend en Js y backend con una base de datos relacional y una no relacional. A su vez, el backend consume 2 microservicios externos.

Se utiliza el servicio Route53 para administrar un nombre de dominio propio y crear un registro de alias que apunte a la distribución de CloudFront.

CloudFront se utiliza para la distribución del contenido de la aplicación web, apuntando al bucket S3 donde está almacenado el frontend y al backend que corre en instancias EC2 a través del ALB.

El ALB se encarga de distribuir la carga entre las instancias EC2 y de la administración de las mismas (escalado, comprobación de estado).

Las instancias EC2 tienen acceso a dos bases de datos: Aurora, base de datos relacional completamente administrada (escalado, backups automáticos, alta disponibilidad y tolerancia a fallos), y DynamoDB, base de datos no relacional también completamente administrada.

Por último, el backend consume microservicios externos, por lo que se utilizan Nat Gateways en las subnets públicas para darles acceso a internet de forma segura.

Alternativas:

El backend se puede correr utilizando lambdas en vez de instancias EC2, solución serverless. Se reemplazaría el load balancer y las instancias EC2 por un API Gateway que enruta las solicitudes a la función Lambda, que tendría el mismo acceso a las bases de datos y microservicios externos.

Como alternativa para DynamoDb se puede utilizar DocumentDB, también completamente administrado y compatible con MongoDB.

No se tiene información respecto a los microservicios externos, pero si se encontraran, por ejemplo en otra VPC, se podría establecer una VPC peering connection de manera que se comuniquen mediante una IP privada, evitando pasar por redes de internet públicas (conexión más segura).

