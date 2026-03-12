# Backend Evaluación 1

API REST construida con **Node.js**, **Express** y **MongoDB/Mongoose** para administrar:

* **Consoles**
* **Games**
* **Auth / Users**

El proyecto incluye autenticación con **JWT**, control de acceso por usuario autenticado, relaciones entre colecciones con `populate`, y validaciones con Mongoose.

---

## 1. Tecnologías usadas

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JSON Web Token (`jsonwebtoken`)
* Bcrypt / BcryptJS
* Postman

---

## 2. Instalación del proyecto

### Inicializar proyecto

```bash
npm init -y
```

### Instalar dependencias principales

```bash
npm i express
npm i mongoose
npm i jsonwebtoken
npm install bcryptjs
```

### Ejecutar el servidor

```bash
node --watch server.js / npm start
```

## 3. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=3001
MONGODB_URI=URI
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1d
```
---

## 4. Endpoints

URL base: para cualquiera: http://localhost:3001/

Eso significa que los endpoints reales comienzan con:

**Users**:
GET
* `http://localhost:3001/api/auth/login`
* `http://localhost:3001/api/auth/users/{id}` (solo admin)
* `http://localhost:3001/api/auth/users`      (solo admin)

POST
* `http://localhost:3001/api/auth/register` (solo admin)


**Consoles**:
GET
* `http://localhost:3001/api/consoles/`
* `http://localhost:3001/api/consoles/{id}`

POST
* `http://localhost:3001/api/consoles/` (solo admin)

PUT / PATCH / DELETE
* `http://localhost:3001/api/consoles/{id}` (solo admin)


**Games**:
GET
* `http://localhost:3001/api/games/`
* `http://localhost:3001/api/games/{id}`

POST
* `http://localhost:3001/api/games/`

PUT / PATCH / DELETE
* `http://localhost:3001/api/games/{id}` (solo con los del mismo user)

---

## 5. Cómo iniciar y probar el proyecto

1. Levanta el servidor.
2. Verifica que MongoDB esté conectado correctamente.
3. Usa Postman para probar los endpoints.
4. Primero crea o registra un usuario.
5. Luego inicia sesión para obtener un token JWT.
6. Usa ese token en endpoints protegidos.

---

## 6. Autenticación

Los endpoints protegidos requieren token JWT.

En Postman debes agregar en **Headers**:

```http
Authorization: Bearer TU_TOKEN
```

## 7. Agregar registros (ejemplos)

Ejemplo de body JSON (User):

```json
{
  "nombre": "nombre",
  "email": "user@correo.com",
  "password": "password"
}

Ejemplo de body JSON (Consola):

```json
{
  "nombre": "Nintendo Switch",
  "fabricante": "Nintendo",
  "añoLanzamiento": 2017
}
```
Ejemplo de body JSON (Game):

```json
{
    "titulo": "Alan Wake",
    "genero": "Accion",
    "precioEstimado": 13.99,
    "consola": "{IdConsolaObtenido del endpoint GET /api/consoles}"
}
```
## 8. Regla importante de autorización en Games

El proyecto debe impedir que un usuario modifique o elimine juegos creados por otro usuario.

La forma correcta es filtrar por:

* `_id` del juego
* `creador` igual al usuario autenticado

Así solo el dueño del juego puede modificarlo o eliminarlo.

---

## 9. Flujo recomendado para probar la API

1. Iniciar sesión.
2. Copiar el token JWT.
3. Crear un juego usando ese token.
4. Listar juegos con `GET /api/games`.
5. Probar `PUT`, `PATCH` y `DELETE` sobre un juego creado por el mismo usuario.

---

## 10. Autor

Proyecto backend desarrollado como evaluación práctica usando Node.js, Express, MongoDB y JWT por Gustavo Díaz L.
