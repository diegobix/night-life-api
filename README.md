# NightLife API

Api de la aplicacion web [NightLife](http://jesuscuesta.es/nightlife)

- [NightLife API](#nightlife-api)
  - [Instalar el proyecto](#instalar-el-proyecto)
  - [Login en la aplicacion](#login-en-la-aplicacion)
    - [Token](#token)
  - [Locales](#locales)
    - [Obtener todos los locales de la base de datos](#obtener-todos-los-locales-de-la-base-de-datos)
    - [Obtener información de un local concreto](#obtener-información-de-un-local-concreto)
    - [Agregar un local nuevo](#agregar-un-local-nuevo)
    - [Actualizar un local](#actualizar-un-local)
    - [Eliminar un local](#eliminar-un-local)
    - [Agregar reseña](#agregar-reseña)
  - [Usuarios](#usuarios)
    - [Agregar un nuevo usuario](#agregar-un-nuevo-usuario)
    - [Obtener informacion de tu perfil](#obtener-informacion-de-tu-perfil)
    - [Obtener informacion de un usuario](#obtener-informacion-de-un-usuario)

## Instalar el proyecto

1. Clonar el pryecto `git clone https://github.com/Smmook/night-life-api.git`

2. Abrir consola en la carpeta night-life-api

3. Ejecutar `npm install` para instalar dependencias.

4. Para iniciar el servidor en modo desarrollo ejecutar el comando `npm run dev`.

5. El servidor se inicia en localhost:3001.
   
## Login en la aplicacion

Mandar solicitud `POST` a la ruta `https://night-life-api.onrender.com/api/login` con el header `Content-Type: application/json`. En el `body` de la solicitud incluir en formato json los datos de login:

```json
{
  "username": "nombre de usuario",
  "password": "password"
}
```

### Token

En caso de ser correcto el login, se recibira un [token](https://jwt.io/introduction) en formato `string` que se debera almacenar en el local storage del front.

El token almacenado se usara para autentificarse en distintas solicitudes a la API. Para ello se usara el header `Authorization` con el valor `Bearer token` done `token` debera ser sustituido por el valor de este. Por ejemplo:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## Locales

Ruta principal: [https://night-life-api.onrender.com/](https://night-life-api.onrender.com/)

### Obtener todos los locales de la base de datos

Mandar solicitud `GET` a la ruta principal: [https://night-life-api.onrender.com/api/locales](https://night-life-api.onrender.com/api/locales)

### Obtener información de un local concreto

Mandar solicitud `GET` a la ruta: `https://night-life-api.onrender.com/api/locales/id` sustituyendo 'id' por el numero correspondiente.

### Agregar un local nuevo

Mandar solicitud `POST` a la ruta: `https://night-life-api.onrender.com/api/locales`
Agregar el header: `Content-Type: application/json`
Agregar el header: `Authorization` con el valor `Bearer token`, sustituyendo `token` por el valor correspondiente y respetando el espacio.
Agregar la información del local como un objeto json en el body. Por ejemplo:

```json
{
    "nombre": "Test post",
    "direccion": "Calle nueva",
    "musica": "music",
    "url": "www.test.com",
    "consumicion": "7",
    "horario": "23:00-03:00",
}
```

La respuesta devolvera el local creado si la solicitud tiene exito.

### Actualizar un local

Mandar solicitud `PUT` a la ruta: `https://night-life-api.onrender.com/api/locales/id` sustituyendo 'id' por el numero correspondiente.
Agregar el header: `Content-Type: application/json`
Agregar el header: `Authorization` con el valor `Bearer token`, sustituyendo `token` por el valor correspondiente y respetando el espacio.
Agregar la información del local como un objeto json en el body. Por ejemplo:

```json
{
    "nombre": "Test post",
    "direccion": "Calle nueva",
    "musica": "music",
    "url": "www.test.com",
    "consumicion": 7,
    "horario": "23:00-03:00"
}
```

### Eliminar un local

Mandar solicitud `DELETE` a la ruta: `https://night-life-api.onrender.com/api/locales/id` sustituyendo 'id' por el numero correspondiente.
Agregar el header: `Authorization` con el valor `Bearer token`, sustituyendo `token` por el valor correspondiente y respetando el espacio.

### Agregar reseña

Mandar solicitud `POST` a la ruta: `https://night-life-api.onrender.com/api/locales/id/reviews` cambiando `id` por el id del local que se este evaluando.
Agregar el header: `Content-Type: application/json`
Agregar el header: `Authorization` con el valor `Bearer token`, sustituyendo `token` por el valor correspondiente y respetando el espacio.
Agregar la información de la review como un objeto json en el body.

```json
{
    "content": "El local es una puta basura."
}
```

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

### Obtener informacion de tu perfil

Mandar solicitud `GET` a la ruta: `https://night-life-api.onrender.com/api/users/profile`.
Agregar el header: `Authorization` con el valor `Bearer token`, sustituyendo `token` por el valor correspondiente y respetando el espacio.

### Obtener informacion de un usuario

Mandar solicitud `GET` a la ruta: `https://night-life-api.onrender.com/api/users/id` sustituyendo 'id' por el numero correspondiente.
