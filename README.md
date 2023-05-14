# NightLife API

Api de la aplicacion web NightLife

- [NightLife API](#nightlife-api)
  - [Uso de la API](#uso-de-la-api)
    - [Obtener todos los locales de la base de datos](#obtener-todos-los-locales-de-la-base-de-datos)
    - [Obtener información de un local concreto](#obtener-información-de-un-local-concreto)
    - [Agregar un local nuevo](#agregar-un-local-nuevo)
    - [Borrar un local concreto](#borrar-un-local-concreto)
    - [Actualizar un local](#actualizar-un-local)
    - [Agregar reseña](#agregar-reseña)
  - [Usuarios](#usuarios)
    - [Agregar un nuevo usuario](#agregar-un-nuevo-usuario)
    - [Obtener informacion de un usuario](#obtener-informacion-de-un-usuario)
  - [Instalar el proyecto](#instalar-el-proyecto)



## Uso de la API

Ruta principal: [https://night-life-api.onrender.com/](https://night-life-api.onrender.com/)

### Obtener todos los locales de la base de datos

Mandar solicitud `GET` a la ruta principal: [https://night-life-api.onrender.com/api/locales](https://night-life-api.onrender.com/api/locales)

### Obtener información de un local concreto

Mandar solicitud `GET` a la ruta: `https://night-life-api.onrender.com/api/locales/id` sustituyendo 'id' por el numero correspondiente.

### Agregar un local nuevo

Mandar solicitud `POST` a la ruta: `https://night-life-api.onrender.com/api/locales`
Agregar el header: `Content-Type: application/json`
Agregar la información del local como un objeto json en el body. Por ejemplo:
```json
{
    "nombre": "Test post",
    "direccion": "Calle nueva",
    "musica": "music",
    "url": "www.test.com",
    "consumicion": 7,
    "horario": "23:00-03:00",
    "userId": "645a2881417af83932e98aaa"
}
```

userId es el id de usuario que crea el local.

### Borrar un local concreto

Mandar solicitud `DELETE` a la ruta: `https://night-life-api.onrender.com/api/locales/id` sustituyendo 'id' por el numero correspondiente.

### Actualizar un local

Mandar solicitud `PUT` a la ruta: `https://night-life-api.onrender.com/api/locales/id` sustituyendo 'id' por el numero correspondiente.
Agregar el header: `Content-Type: application/json`
Agregar la información del local como un objeto json en el body. Por ejemplo:
```json
{
    "nombre": "Test post",
    "direccion": "Calle nueva",
    "musica": "music",
    "url": "www.test.com",
    "consumicion": 7,
    "horario": "23:00-03:00",
    "userId": "645a2881417af83932e98aaa"
}
```

### Agregar reseña

Mandar solicitud `POST` a la ruta: `https://night-life-api.onrender.com/api/locales/id/reviews` cambiando `id` por el id del local que se este evaluando.
Agregar el header: `Content-Type: application/json`
Agregar la información de la review como un objeto json en el body.

```json
{
    "content": "El local es una puta basura.",
    "date": Date (opcional),
    "userId": "645a2881417af83932e98aaa",
    "local": "312a2881417af83932e98aaa"
}
```

En caso de no incluir el campo `date` el servidor le asignara la fecha y hora en el que se crea la review.

## Usuarios

### Agregar un nuevo usuario

Mandar solicitud `POST` a la ruta: `https://night-life-api.onrender.com/api/users`
Agregar el header: `Content-Type: application/json`
Agregar la información del usuario como un objeto json en el body.

```json
{
    "name": "Diego Arenas",
    "username": "Diego123",
    "email": "test@mail.com",
    "password": "password"
}
```

El nombre de usuario y el email deben ser unicos y se hara la comprobacion pertinente en el servidor.

### Obtener informacion de un usuario

Mandar solicitud `GET` a la ruta: `https://night-life-api.onrender.com/api/users/id` sustituyendo 'id' por el numero correspondiente.

## Instalar el proyecto

1. Clonar el pryecto `git clone https://github.com/Smmook/night-life-api.git`

2. Abrir consola en la carpeta night-life-api

3. Ejecutar `npm install` para instalar dependencias.

4. Para iniciar el servidor en modo desarrollo ejecutar el comando `npm run dev`.

5. El servidor se inicia en localhost:3001 .