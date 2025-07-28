# PanamaCompra Redesign :rocket:

![Badge de Construcción](https://img.shields.io/badge/Build-Passing-brightgreen) ![Badge de Versión](https://img.shields.io/badge/Version-1.0.0-blue) ![Badge de Licencia](https://img.shields.io/badge/License-MIT-yellow)

¡Bienvenido al repositorio de PanamaCompra Redesign! :globe_with_meridians: Este proyecto es una aplicación web moderna diseñada para transformar la plataforma de compras públicas de Panamá. Permite a proveedores registrarse, explorar catálogos de productos, generar cotizaciones y manejar flujos de trabajo de adquisiciones de manera eficiente y digital. Desarrollado como parte de un proyecto educativo, se enfoca en la usabilidad, seguridad y escalabilidad.

## :clipboard: Descripción General
PanamaCompra Redesign es una solución full-stack para modernizar las adquisiciones públicas. Utiliza una arquitectura de tres capas (frontend con React, backend con Express y base de datos SQLite) para ofrecer una experiencia intuitiva. Incluye características clave como autenticación segura, navegación dinámica y generación de PDFs para facturas.

- **Propósito:** Facilitar compras públicas digitales, reduciendo tiempos y mejorando la transparencia.
- **Tecnologías Principales:** React, Express, SQLite, Tailwind CSS.
- **Estado Actual:** Proyecto en desarrollo, con funcionalidades como registro de usuarios y generación de cotizaciones implementadas.

## :wrench: Cómo Empezar
Sigue estos pasos para clonar y ejecutar el proyecto localmente. Asegúrate de tener [Node.js](https://nodejs.org/) y npm instalados.

### :gear: Requisitos
- Node.js 20.x o superior
- npm (viene con Node.js)
- Un editor de código como VS Code

### :computer: Instalación
1. Clona este repositorio:
   ```
   git clone https://github.com/tu-usuario/panamacompra-redesign.git
   cd panamacompra-redesign
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Configura variables de entorno: Crea un archivo `.env` en la raíz del proyecto basado en el ejemplo proporcionado (o consulta la sección de configuración para detalles).
4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```
   - El frontend se ejecutará en `http://localhost:5173`.
   - El backend se ejecutará en `http://localhost:3001`.

## :rocket: Uso y Funcionalidades
Una vez ejecutado, puedes explorar las principales características:

- **Autenticación:** Regístrate o inicia sesión para acceder a funcionalidades protegidas. :lock:
- **Catálogo de Productos:** Navega por categorías y productos, con filtros dinámicos.
- **Generación de Cotizaciones:** Crea cotizaciones interactivas, genera PDFs y envíalos por correo. :envelope:
- **Interfaz Amigable:** Diseño responsivo con modo oscuro y menús intuitivos.

### Tabla de Funcionalidades Principales
| Función                  | Descripción                                                                 | Tecnología Usada         |
|-------------------------|-----------------------------------------------------------------------------|--------------------------|
| :busts_in_silhouette: Registro de Usuarios | Permite a proveedores crear cuentas con autenticación segura.              | bcrypt, React Modals     |
| :mag: Navegación de Catálogo | Explora productos categorizados con búsqueda y filtrado.                   | React, Express API       |
| :file_folder: Generación de Cotizaciones | Formularios para crear cotizaciones, con.preview y descarga de PDFs.       | @react-pdf/renderer, nodemailer |
| :email: Envío de Correos | Envía facturas adjuntas por correo electrónico usando SMTP.                | Nodemailer, Mailtrap     |

## :art: Arquitectura del Sistema
El sistema sigue una arquitectura moderna de tres capas para una separación clara de responsabilidades:

- **Frontend (SPA con React):** Gestiona la interfaz de usuario, enrutamiento y estados con React Router y Tailwind CSS.
- **Backend (API REST con Express):** Maneja lógica de negocio, autenticación y acceso a datos.
- **Base de Datos (SQLite):** Almacena usuarios, productos y facturas en tablas con integridad referencial.

Para más detalles, consulta la documentación completa en [ARCHITECTURE.md](ARCHITECTURE.md) o el documento original adjunto.

## :bug: Contribución
¡Queremos que este proyecto crezca! Si deseas contribuir: :handshake:

1. Haz un fork de este repositorio.
2. Crea una rama para tu característica o corrección: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y commit: `git commit -m "Añade nueva funcionalidad"`.
4. Envía un pull request. :arrow_up:
5. Asegúrate de que el código pase las pruebas de linting (`npm run lint`).

Usa GitHub Issues para reportar bugs o sugerir mejoras. ¡Todas las contribuciones son bienvenidas!

## :lock: Licencia
Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## :tada: Créditos
- Desarrollado por Cristian Romero como parte del curso de Licenciatura en Desarrollo de Software en UTP.
- Fecha de Documentación: 28 de julio de 2025.

¡Gracias por visitar el repositorio! Si tienes preguntas, abre un issue o contacta al maintainer. :sparkles:

