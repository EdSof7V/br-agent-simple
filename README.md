# 🚀 GTI RIPLEY
![Diagrama de Arquitectura](./docs/images/gti-dm-bck-readme-diagram.png)
 
## Descripción
GTI (Gestión de Tecnologías de Información) es una plataforma integral para Ripley que centraliza la administración de múltiples aplicaciones críticas del negocio. Desarrollada con Next.js 14, proporciona una interfaz moderna y segura que permite gestionar herramientas como Dashboard Manager, Catálogo de Datos, y APM (Application Manager).
La plataforma utiliza Firebase Autentication para la autenticación y Cloud SQL Postgres para la base de datos, ofreciendo una solución robusta y escalable para la gestión tecnológica de Ripley.
 
 
### Infraestructura general
- **Cliente Web**: En la parte superior, representa la interfaz de usuario que acceden los usuarios finales.
- **Frontend**: Es el núcleo de la interfaz de usuario, implementado con Next.js (representado por el ícono "N").
- **Backend**: Utiliza FastAPI como framework para crear la API que sirve datos al frontend.
- **Despliegue**: La aplicación se construye (Build) y se aloja en Cloud Run.
 
### Componentes del Frontend
- **EDC**: Componente central que coordina otros subsistemas.
- **Varios módulos de API y servicios**:
  - **Client API (Axios)**: Gestiona las comunicaciones con el backend.
  - **Context API**: Maneja el estado global de la aplicación.
  - **Hooks**: Funcionalidades reutilizables.
  - **Pages**: Las diferentes vistas de la aplicación.
  - **Components**: Elementos reutilizables de UI.
  - **Autenticación**: Sistema de login y gestión de sesiones.
 
### Servicios específicos
- **Servicio de usuarios**: Gestión de usuarios.
- **Servicio de grupos**: Manejo de permisos por grupos.
- **Servicio de dashboards**: Configuración y datos para los paneles.
- **Contexto de Usuario**: Mantiene el estado del usuario actual.
 
### Secciones principales
- **Administración**: Para gestión de la plataforma.
- **Dashboards**: Los paneles de visualización para usuarios.
 
 
### Comunicación
- **CORS**: Se implementa para permitir la comunicación segura entre el frontend y backend.
 
Esta arquitectura sigue un patrón común para aplicaciones empresariales modernas, con separación clara entre frontend y backend, integración con servicios de autenticación empresarial (Azure AD), y un enfoque en la creación de dashboards.
 
## Tabla de Contenidos
- [Descripción](#descripción)
- [Características](#características)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Licencia](#licencia)
 
## Características
- Autenticación con Firebase Autentication
- Dashboard interactivo con ApexCharts
- Gestión de usuarios y roles
- Interfaz adaptativa con modo oscuro/claro usando Tailwind CSS
- Visualización de datos en tiempo real
- Formularios con React Hook Form
- Integración con API REST
 
## Prerrequisitos
- Node.js 20.x o superior
- npm 9.x o superior
- Firebase CLI
- Cuenta de Firebase
 
## Instalación
1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

 
 # Arquitectura de Next.js por Dominios

## 🧠 Concepto Principal

La arquitectura por dominios en Next.js organiza el código según características o módulos funcionales del negocio, en lugar de por tipos técnicos. Cada dominio encapsula todos los componentes, hooks, servicios y lógica relacionada con una funcionalidad específica. Esto permite una mejor escalabilidad, mantenimiento y separación de responsabilidades.

---

## 🗂️ Estructura Básica del Proyecto

```bash
/src
  📂 features                 
  ├── 📂 auth                 
  │   ├── 📂 components
  │   │   ├── 📄 LoginForm.tsx
  │   │   └── 📄 LogoutButton.tsx
  │   ├── 📂 hooks
  │   │   ├── 📄 useLogin.ts
  │   │   └── 📄 useAuthStatus.ts
  │   └── 📂 services
  │       └── 📄 authService.ts       
  │
  └── 📂 products            
      ├── 📂 components
      │   ├── 📄 ProductList.tsx
      │   └── 📄 ProductCard.tsx
      ├── 📂 hooks
      │   └── 📄 useProducts.ts
      └── 📂 services
          └── 📄 productService.ts    

📂 shared                      
├── 📂 components
│   ├── 📄 Button.tsx
│   └── 📄 Modal.tsx
├── 📂 hooks
│   ├── 📄 useDebounce.ts
│   └── 📄 useToggle.ts
└── 📂 utils
    ├── 📄 formatDate.ts
    └── 📄 logger.ts

📂 app                     
├── 📄 page.tsx
├── 📂 login
│   └── 📄 page.tsx
└── 📂 products
    └── 📄 page.tsx
