# PiggySave 🐷💰

**PiggySave** es una aplicación web de finanzas personales que permite llevar el control de ingresos y gastos de forma sencilla, visual y organizada por categorías. Construida con React y Vite, ofrece una experiencia moderna, rápida y totalmente responsive, con un panel de análisis que resume el balance del usuario y su evolución mes a mes.

El objetivo del proyecto es ofrecer una herramienta clara y minimalista para que cualquier usuario pueda registrar sus movimientos económicos y entender de un vistazo en qué está gastando e ingresando su dinero, la API 
no está encendida ahora mismo por lo que no funciona.

---

## Características

### Funcionalidades principales

- **Autenticación completa**: registro, inicio de sesión y recuperación/cambio de contraseña mediante token de sesión.
- **Rutas protegidas**: acceso controlado a la aplicación mediante sesión activa, redirigiendo automáticamente a los usuarios no autenticados.
- **Gestión de ingresos**: alta, edición y borrado de movimientos de ingreso.
- **Gestión de gastos**: alta, edición y borrado de movimientos de gasto.
- **Categorías**: cada movimiento se asocia a una categoría, visualizada en una cuadrícula clara e intuitiva.
- **Panel de análisis**: balance neto, ratio de gasto sobre ingreso y evolución mensual (últimos 6 meses) representados con gráficos propios construidos en CSS.
- **Dashboard (Home)**: pantalla principal con el balance estimado y accesos directos a las secciones clave.
- **Perfil de usuario**: gestión de la sesión y cierre de sesión.
- **Onboarding**: pantalla de bienvenida con slides introductorios para nuevos usuarios.
- **Diseño responsive**: navegación inferior en móvil y barra superior en escritorio, adaptando la experiencia a cada dispositivo.

### Casos de uso

- Registrar los ingresos y gastos mensuales de forma rápida.
- Consultar el balance general y su evolución en el tiempo.
- Organizar los movimientos económicos por categorías para tener una visión clara del destino del dinero.
- Editar o eliminar movimientos introducidos por error.

### Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **React 19** | Librería principal para construir la interfaz mediante componentes funcionales y Hooks. |
| **React Router DOM 7** | Enrutado de la aplicación (rutas públicas y protegidas). |
| **Vite 8** | Entorno de desarrollo y build de producción, con recarga en caliente. |
| **Bootstrap 5.3** | Sistema de estilos, utilidades y componentes base. |
| **Chart.js / React-Chartjs-2** | Soporte para visualización de datos y gráficos. |
| **CSS personalizado** | Sistema de diseño propio (colores, tipografías y componentes visuales) sobre Bootstrap. |
| **ESLint** | Aseguramiento de la calidad y consistencia del código. |
| **Fetch API** | Comunicación con el backend mediante peticiones REST. |
| **LocalStorage** | Persistencia de la sesión del usuario en el cliente. |

---

## Estructura del proyecto

```
piggysave/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                   # Punto de entrada de la aplicación
    ├── App.jsx                    # Componente raíz
    ├── styles.css/
    │   └── variables.css          # Sistema de diseño: colores, tipografías y estilos globales
    ├── assets/                    # Imágenes e iconos
    ├── routes/
    │   ├── AppRouter.jsx          # Definición de todas las rutas
    │   └── ProtectedRoute.jsx     # Control de acceso a rutas privadas
    ├── components/
    │   ├── index.js
    │   └── UI/
    │       ├── AppBackground.jsx      # Layout de las pantallas internas
    │       ├── FormBackground.jsx     # Layout de autenticación y onboarding
    │       ├── NavBarTop.jsx          # Navegación superior (escritorio)
    │       ├── NavBarBottom.jsx       # Navegación inferior (móvil)
    │       ├── CustomButton.jsx       # Botón reutilizable
    │       ├── CustomClicableText.jsx # Texto interactivo reutilizable
    │       ├── Analysis/AnalysisOptions.jsx
    │       └── OnBoard/Slice.jsx
    └── pages/
        ├── index.js
        ├── Splash.jsx               # Pantalla de carga inicial
        ├── OnBoarding/OnBoard.jsx   # Flujo de bienvenida
        ├── Auth/
        │   ├── Auth.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── PwdRecover.jsx
        └── App/
            ├── Home.jsx
            ├── Categories.jsx
            ├── Profile.jsx
            └── Analysis/
                ├── Analysis.jsx
                ├── Revenue/
                │   ├── Revenues.jsx
                │   ├── CreateRevenue.jsx
                │   ├── UpdateRevenue.jsx
                │   └── DeleteRevenue.jsx
                └── Expense/
                    ├── Expenses.jsx
                    ├── CreateExpense.jsx
                    ├── UpdateExpense.jsx
                    └── DeleteExpense.jsx
```

El proyecto sigue una organización modular por dominio (auth, análisis, ingresos, gastos), con **barrel files** (`index.js`) que centralizan las exportaciones de componentes y páginas para mantener los imports limpios y ordenados.

---

## Requisitos

Para ejecutar el proyecto necesitas:

- **Node.js 20 LTS** o superior
- **npm** como gestor de paquetes
- Una **API REST** compatible en ejecución (backend), que expone los endpoints de autenticación, ingresos, gastos y categorías
- Variable de entorno `VITE_API_URL` apuntando a la URL de dicha API

---

## Dependencias

### Dependencias de producción

| Paquete | Descripción |
|---|---|
| `react` | Librería principal para la construcción de la interfaz. |
| `react-dom` | Renderizado de React en el navegador. |
| `react-router-dom` | Gestión de rutas y navegación de la SPA. |
| `bootstrap` | Sistema de estilos y componentes base. |
| `chart.js` | Motor de generación de gráficos. |
| `react-chartjs-2` | Integración de Chart.js con React. |

### Dependencias de desarrollo

| Paquete | Descripción |
|---|---|
| `vite` | Servidor de desarrollo y bundler de producción. |
| `@vitejs/plugin-react` | Integración de React con Vite (JSX, Fast Refresh). |
| `eslint` | Linter para mantener la calidad del código. |
| `@eslint/js` | Reglas base recomendadas de ESLint. |
| `eslint-plugin-react-hooks` | Reglas de buenas prácticas para el uso de Hooks. |
| `eslint-plugin-react-refresh` | Compatibilidad de linting con React Fast Refresh. |
| `globals` | Definición de entornos globales para ESLint. |
| `@types/react`, `@types/react-dom` | Tipado para mejorar el autocompletado en el editor. |

---

## Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/JSanchez2976/piggysave.git
cd piggysave

# 2. Instala las dependencias
npm install
```

---

## Configuración

Crea un archivo `.env` en la raíz del proyecto con la siguiente variable:

```env
VITE_API_URL=https://tu-api.com
```
Sustituye el valor por la URL de la API proporcionada por el equipo de backend. Esta variable define la base sobre la que la aplicación construye todas sus peticiones de autenticación, ingresos, gastos y categorías.

La sesión del usuario se gestiona mediante un token guardado en localStorage, que se envía automáticamente en la cabecera Authorization: Bearer <token> en todas las peticiones a rutas protegidas.

---

## Ejecución

### Desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

### Producción

```bash
# Genera el build optimizado
npm run build

# Previsualiza el build de producción
npm run preview
```

El contenido generado en `dist/` está listo para desplegarse en cualquier hosting de archivos estáticos (Vercel, Netlify, Nginx, etc.), definiendo `VITE_API_URL` como variable de entorno en el momento del build.

---

## Cómo funciona

### Flujo de la aplicación

1. **Splash**: pantalla de carga inicial que dirige al usuario al onboarding o a la pantalla de autenticación.
2. **Onboarding**: presentación breve de la aplicación mediante slides para nuevos usuarios.
3. **Autenticación**: el usuario se registra o inicia sesión; al autenticarse correctamente, se genera un token de sesión que habilita el acceso al resto de la aplicación.
4. **Rutas protegidas**: `ProtectedRoute` valida la existencia de sesión activa antes de renderizar cualquier pantalla interna.
5. **Home**: calcula y muestra el balance estimado combinando el total de ingresos y gastos del usuario.
6. **Analysis**: procesa los ingresos y gastos para mostrar el balance neto, el ratio de gasto sobre ingreso y un gráfico de evolución mensual de los últimos 6 meses.
7. **Revenues / Expenses**: cada sección muestra un resumen (total acumulado, total del mes, últimos movimientos) y da acceso a la creación, edición y borrado de movimientos.
8. **Categories**: presenta las categorías disponibles para clasificar ingresos y gastos.
9. **Profile**: muestra los datos del usuario autenticado y permite cerrar sesión.

### Arquitectura

- **`routes/`** controla la navegación y el acceso a las distintas secciones de la aplicación.
- **`pages/`** concentra la lógica de negocio de cada pantalla: estado, peticiones a la API y validaciones de formulario.
- **`components/UI/`** aporta piezas de interfaz reutilizables y layouts comunes que dan coherencia visual a toda la aplicación.
- **`styles.css/variables.css`** define el sistema de diseño (colores, tipografías y utilidades propias) que se combina con Bootstrap.

Los ingresos se almacenan con importe positivo y los gastos con importe negativo, lo que permite calcular el balance neto sumando directamente ambas colecciones sin lógica adicional. Los cálculos de estadísticas (totales, ratios, agrupación mensual) se resuelven en el cliente mediante `useMemo`, ofreciendo una experiencia fluida sin depender de endpoints de agregación adicionales.

---

## API

La aplicación consume una API REST propia a través de `VITE_API_URL`. Todas las peticiones a rutas protegidas incluyen la cabecera `Authorization: Bearer <token>`.

### Autenticación

| Método | Ruta | Body | Descripción |
|---|---|---|---|
| `POST` | `/auth/login` | `{ username, password }` | Inicia sesión y devuelve el token de acceso. |
| `POST` | `/auth/register` | `{ username, password }` | Crea una nueva cuenta de usuario. |
| `POST` | `/auth/profile` | `{ username, password }` | Actualiza la contraseña del usuario autenticado. |

```bash
curl -X POST "$VITE_API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "user1234", "password": "supersecret"}'
```

### Ingresos

| Método | Ruta | Body | Descripción |
|---|---|---|---|
| `GET` | `/revenue/` | — | Obtiene todos los ingresos del usuario. |
| `POST` | `/revenue/create` | `{ fecha, concepto, categoria, importe, notas }` | Crea un nuevo ingreso. |
| `POST` | `/revenue/edit/:id` | `{ fecha, concepto, categoria, importe, notas }` | Edita un ingreso existente. |
| `POST` | `/revenue/delete/:id` | — | Elimina un ingreso. |

```bash
curl -X POST "$VITE_API_URL/revenue/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fecha": "2026-08-01",
    "concepto": "Salary",
    "categoria": 3,
    "importe": 1500,
    "notas": "Nómina de agosto"
  }'
```

### Gastos

| Método | Ruta | Body | Descripción |
|---|---|---|---|
| `GET` | `/expenses/` | — | Obtiene todos los gastos del usuario. |
| `POST` | `/expenses/create` | `{ fecha, concepto, categoria, importe, notas }` | Crea un nuevo gasto. |
| `POST` | `/expenses/edit/:id` | `{ fecha, concepto, categoria, importe, notas }` | Edita un gasto existente. |
| `POST` | `/expenses/delete/:id` | — | Elimina un gasto. |

### Categorías

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/categories/category/` | Obtiene el listado de categorías disponibles. |

---

## Base de datos

PiggySave sigue una arquitectura desacoplada: el frontend se comunica exclusivamente mediante peticiones REST con el backend, que es el responsable de la persistencia de los datos. El modelo de datos con el que trabaja la aplicación se organiza en torno a las siguientes entidades:

| Entidad | Campos |
|---|---|
| **User** | `username`, `password` |
| **Category** | `id`, `categoria` |
| **Revenue** | `id`, `fecha`, `concepto`, `categoria`, `importe`, `notas` |
| **Expense** | `id`, `fecha`, `concepto`, `categoria`, `importe`, `notas` |

Cada ingreso y gasto está asociado a una categoría y a un usuario, lo que permite construir el panel de análisis y los listados personalizados de cada usuario.

---

## Scripts disponibles

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `npm run dev` | Levanta el servidor de desarrollo con recarga en caliente. |
| `build` | `npm run build` | Genera el build de producción en la carpeta `dist/`. |
| `lint` | `npm run lint` | Ejecuta ESLint sobre todo el proyecto. |
| `preview` | `npm run preview` | Sirve localmente el build de producción para previsualizarlo. |

---

## Ejemplo de uso

1. El usuario se registra con su usuario y contraseña.
2. Inicia sesión y accede al **Home**, donde ve su balance estimado.
3. Entra en **Analysis → Revenues → Create**, introduce fecha, concepto, categoría e importe, y registra un nuevo ingreso.
4. Vuelve a **Analysis** y comprueba cómo el balance y el gráfico mensual reflejan el nuevo movimiento.
5. Registra un gasto desde **Expenses**, que se descuenta automáticamente del balance.
6. Consulta **Categories** para revisar cómo se distribuyen sus movimientos.
7. Cierra sesión desde **Profile** al terminar.

---

## Roadmap

- Ampliar la gestión de categorías para permitir su creación y personalización desde la propia aplicación.
- Incorporar gráficos interactivos adicionales con Chart.js para enriquecer el panel de análisis.
- Añadir filtros y búsqueda avanzada en los listados de ingresos y gastos.
- Exportación de informes financieros (PDF/Excel).
- Soporte para múltiples divisas.

---

## Licencia

Este proyecto no incluye actualmente un archivo de licencia.
