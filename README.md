# Proyecto de la materia de Programación Web 2
Este proyecto es un desarrollo de una aplicacion paso a paso, aplicando los conocimientos aprendidos en la materia de Programación Web 2. 
Usaran patrones y buenas practicas de programación, de la misma forma se explicara en el codigo el funcionamiento y el porque. 

## Variables de entorno

Es importante antes que nada renombrar el archivo `.env.example` a `.env` y luego modificar las variables de entorno
```
DB_HOST= TU HOST DE TU BASE DE DATOS (Si es un servidor local, será 127.0.0.1)
DB_USERNAME= USUARIO DE LA BASE DE DATOS (Generalmente es root)
DB_PASSWORD= CONTRASEÑA DE LA BASE DE DATOS (Si se está utilizando XAMPP dejar vacío)
DB_NAME= NOMBRE DE LA BASE DE DATOS
```
## Iniciar el servidor
Iniciamos el servidor en localhost:8000 con php.
```
php -S localhost:5000 
```

#Explicación del proyecto.

El proyecto tiene una organización basada en `SOLID`, o separación de responsabilidades, para ello ejecutaremos una estructura llamada `Inyección de Dependencias`. En la carpeta `Injectables` Estan todas las clases que se encargan de manipular las tablas de la base de datos, que a su ves son heredadas de la clase `RelationManager`, la cual se encarga de cargar y asignar las relaciones para luego traer tambien los datos de esas tablas. Luego tenemos la carpeta `Controllers` donde estan todos los controladores para cada una de las tablas, las peticiones se harían de la siguiente manera: Se hace la petición primero al `index.php` luego este llama la clase `RequestManager` que se encargará de tomar los datos, tanto el controlador como la acción. Luego la clase `Router` Se encargará de transformar el endpoint de una estructura HTTP a una estructura simple, por ejemplo: Estructura HTTP: `http://localhost:5000/index.php?controller=usuarios&action=eliminar&id=1` Estructura simple: `http://localhost:5000/actividades/eliminar/1`. De esta manera es más fácil poder realizar las peticiones. Luego de esto el controlador llama la clase  `Validate ` que se encargará de validar los campos que se pasarán a través del JSON que se enviará como petición. Si no hay errores en base a las validaciones, el controlador llama a la clase inyectada que funciona como servicio, para así entonces realizar la llamada a la base de datos. Y luego simplemente usando el métdodo  `Return `de la clase  `Controller ` se devuelve la respuesta a la petición.
