# Login App - Aplicación de Autenticación

## 📋 Descripción

Esta es una aplicación web moderna de autenticación y registro de usuarios construida con **Next.js 15** y **TypeScript**. La aplicación proporciona un sistema completo de gestión de usuarios con una interfaz elegante y funcionalidades de seguridad robustas.

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- **Registro de usuarios** con validación de datos
- **Inicio de sesión** seguro con JWT
- **Cierre de sesaión** con limpieza de tokens
- **Middleware de protección** para rutas privadas
- **Persistencia de sesión** en localStorage

### 🎨 Interfaz de Usuario
- **Diseño responsive** que se adapta a todos los dispositivos
- **Tema moderno** con colores de marca Opiron
- **Animaciones suaves** y transiciones elegantes
- **Componentes reutilizables** con Tailwind CSS
- **Experiencia de usuario optimizada**

### 📱 Páginas Incluidas
- **Página de inicio** (`/`) - Landing page con navegación
- **Registro** (`/signup`) - Formulario de creación de cuenta
- **Inicio de sesión** (`/login`) - Formulario de autenticación
- **Dashboard** (`/dashboard`) - Panel principal del usuario (protegido)
- **Página de agradecimiento** (`/thank-you`) - Confirmación post-registro

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: Shadcn/ui
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: Validación personalizada de formularios
- **Base de datos**: JSON Server (simulación)

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ instalado
- npm o yarn como gestor de paquetes

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd login-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts disponibles

- `npm run dev` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter para revisar el código

## 📁 Estructura del Proyecto

```
login-app/
├── app/                    # Páginas y rutas de la aplicación
│   ├── api/               # Endpoints de la API
│   │   ├── login/         # Endpoint de inicio de sesión
│   │   ├── logout/        # Endpoint de cierre de sesión
│   │   └── signup/        # Endpoint de registro
│   ├── dashboard/         # Página del dashboard
│   ├── login/            # Página de inicio de sesión
│   ├── signup/           # Página de registro
│   ├── thank-you/        # Página de agradecimiento
│   ├── globals.css       # Estilos globales
│   └── layout.tsx        # Layout principal
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes de interfaz
├── core/                 # Lógica de negocio
│   ├── models/           # Modelos de datos
│   ├── services/         # Servicios de autenticación
│   └── utils/            # Utilidades y validaciones
├── lib/                  # Librerías y configuraciones
└── middleware.ts         # Middleware de protección de rutas
```

## 🔒 Seguridad

- **Tokens JWT** para autenticación segura
- **Validación de datos** en cliente y servidor
- **Protección de rutas** mediante middleware
- **Sanitización de inputs** para prevenir ataques
- **Manejo seguro de contraseñas**

## 🎯 Funcionalidades Destacadas

### Registro de Usuario
- Formulario con validación en tiempo real
- Verificación de email único
- Confirmación de contraseña
- Redirección automática tras registro exitoso

### Dashboard Protegido
- Acceso solo para usuarios autenticados
- Información del perfil del usuario
- Opciones de navegación personalizadas
- Funcionalidad de cierre de sesión

### Experiencia de Usuario
- Mensajes de error claros y útiles
- Estados de carga durante las operaciones
- Navegación intuitiva entre páginas
- Diseño responsive para móviles y desktop

## 🚀 Despliegue

La aplicación está lista para ser desplegada en plataformas como:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **Railway**
- **Heroku**

### Preparación para producción
```bash
npm run build
npm start
```

## 🤝 Contribución

Si deseas contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ usando Next.js y TypeScript**
