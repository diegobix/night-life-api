# NightLife API

Api de la app de Android NightLife

## Uso de la API

Ruta principal: [https://night-life-api.onrender.com/api/locales](https://night-life-api.onrender.com/api/locales)

### Obtener todos los locales de la base de datos

Mandar solicitud `GET` a la ruta principal: [https://night-life-api.onrender.com/api/locales](https://night-life-api.onrender.com/api/locales)

### Obtener información de un local concreto

Mandar solicitud `GET` a la ruta: [https://night-life-api.onrender.com/api/locales/id]() sustituyendo 'id' por el numero correspondiente.

### Agregar un local nuevo

Mandar solicitud `POST` a la ruta: [https://night-life-api.onrender.com/api/locales](https://night-life-api.onrender.com/api/locales)
Agregar el header: `Content-Type: application/json`
Agregar la información del local como un objeto json en el body. Por ejemplo:
```json
{
    "nombre": "Ejemplo",
    "direccion": "Calle Mayor 3",
    "musica": "pop",
    "consumicion": 3,
    "horario": "14:00 a 17:00"
}
```

### Borrar un local concreto

Mandar solicitud `DELETE` a la ruta: [https://night-life-api.onrender.com/api/locales/id]() sustituyendo 'id' por el numero correspondiente.

### Actualizar un local

Mandar solicitud `PUT` a la ruta: [https://night-life-api.onrender.com/api/locales/id]() sustituyendo 'id' por el numero correspondiente.
Agregar el header: `Content-Type: application/json`
Agregar la información del local como un objeto json en el body. Por ejemplo:
```json
{
    "nombre": "Ejemplo",
    "direccion": "Calle Mayor 3",
    "musica": "pop",
    "consumicion": 3,
    "horario": "14:00 a 17:00"
}
```

## Instalar el proyecto

1. Clonar el pryecto `git clone https://github.com/Smmook/night-life-api.git`

2. Abrir consola en la carpeta night-life-api

3. Ejecutar `npm install` para instalar dependencias.

4. Para iniciar el servidor en modo desarrollo ejecutar el comando `npm run dev`.

5. El servidor se inicia en localhost:3001 .