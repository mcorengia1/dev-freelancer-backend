# Dev Freelancer API 📄🔍

API para gestionar un negocio como desarrollador freelancer. El objetivo es poder centralizar multiples funciones que son utiles.

## Features actuales:
- Code Snippets: Poder gestionar templates de codigo para su reutilizacion

## Features futuras:
- Gestion de clientes
- Presupuestador
- Generador de facturas

## Requisitos Previos
- Node.js v18+
- Firebase Project (si usas Firestore)
- Variables de entorno en `.env`:

  ```env  
  PORT=3000
  DB_PROVIDER=firestore
  
  FIREBASE_API_KEY=
  FIREBASE_AUTH_DOMAIN=
  FIREBASE_PROJECT_ID=
  FIREBASE_STORAGE_BUCKET=
  FIREBASE_MESSAGING_SENDER_ID=
  FIREBASE_APP_ID=
  FIREBASE_MEASUREMENT_ID=
  ```

## Instalación
1. git clone https://github.com/mcorengia1/dev-freelancer-backend
2. cd dev-freelancer-backend
3. pnpm install
4. pnpm run dev

## Endpoints
### Crear Snippet
#### `POST /api/snippets`
  ```
  Request Body (JSON):
  {
    lang: string,           // C# / Java / Python
    tags: string[]?,        // ["Hero section" , "DB utils" , "Text format"]
    title string,           // "Boton animado para Nextjs"
    description: string,    // "Es un boton animado sin librerias externas, admite iconos SVG"
    imgUrl: string,         // "repo.com/img.png"
    code: string            // "<div><h1>Hola mundo</h1></div>
  }
  ```

### Obtener Todos los Snippets (Paginado)
#### `GET /api/snippets?pageSize=10&nextPageToken=abc123`

- pageSize	    int	    Máximo de resultados por página (default: 20)
- nextPageToken	string	Token para página siguiente (opcional) (se genera el en cada consulta)

```
  Respuesta 200 OK
  {
              data: snippets[],
              nextPageToken: string || null,
              totalPages: int
  }
```

### Obtener Snippet por ID
#### `GET /api/snippets/:id`

```
Respuesta 200 OK
{
  "id": "abc123",
  "title": "Ejemplo",
  "code": "...",
  "updatedAt": "2023-10-25T12:34:56Z"
}
```

### Actualizar Snippet 
#### `PATCH /api/snippets/:id`
```
  Request Body (JSON):
  {
    // Campos y sus valores a ser reemplazados
  }
```

### Eliminar Snippet
#### `DELETE /api/snippets/:id`

```
  Respuesta 200 OK
```
