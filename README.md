# EDD Dashboard

SPA en React para la gestión de la Evaluación del Desempeño Docente (EDD) de Chile. Soporta módulos de evaluación por año (2024, 2025, 2026) con control de acceso basado en roles y visualización de datos.

- **Versión**: 2.0.0
- **Stack**: React 19, React Router 7, Vite 6, Highcharts 12, TanStack Table/Virtual, Context API

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm 9 o superior (incluido con Node.js)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd edd-dashboard
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea el archivo de variables de entorno a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

   Luego edita `.env` con los valores correspondientes a tu entorno (ver [Variables de entorno](#variables-de-entorno)).

## Uso en desarrollo

Levanta el servidor de desarrollo con hot reload:

```bash
npm run dev
```

La aplicación quedará disponible en [http://localhost:5173/front/](http://localhost:5173/front/) (el path base `/front/` es requerido por la configuración de rutas).

## Build de producción

Genera el build optimizado en la carpeta `dist/`:

```bash
npm run build
```

Para previsualizar el build de producción localmente:

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

> No hay suite de tests configurada en este proyecto (no existe `npm test`).

## Variables de entorno

| Variable        | Descripción                                   | Ejemplo                                     |
| --------------- | ---------------------------------------------- | -------------------------------------------- |
| `VITE_BASE_URL` | URL base del backend (API), sin slash final    | `http://api-docentemas-dev.3htp.cloud:8095` |

Consulta `.env.example` como referencia. El archivo `.env` no se versiona (está en `.gitignore`).

## Estructura del proyecto

```
src/
├── modules/            # Módulos por año de evaluación (EDD2024Module, EDD2025Module, EDD2026Module)
│   └── EDD<YEAR>Module/
│       ├── elements/    # Secciones/features del módulo
│       ├── services/    # Llamadas a la API
│       └── utils/       # Transformaciones de datos
├── hooks/               # Hooks compartidos (useCustomFetch, useCustomDownload, etc.)
├── context/             # Providers de estado global (Auth, Loading, Notification)
└── ...
```

Cada ruta vive bajo el path base `/front` y está anidada como `/dashboard/:year/*`, protegida por `RouteProtector` según roles.

## Licencia

Proyecto privado.
