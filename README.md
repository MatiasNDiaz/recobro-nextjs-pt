# 🚀 Next.js Multi-tenant SaaS Dashboard - Prueba Técnica Recobro

Este proyecto es una simulación de un **Dashboard SaaS** para la gestión de proyectos organizacionales, construido con **Next.js 15 (App Router)**. El foco principal ha sido demostrar un alto criterio técnico a través de la arquitectura, la separación de responsabilidades y un diseño escalable.

## 🏗️ Arquitectura: Screaming Architecture & Modularidad

Se ha implementado un enfoque de **Screaming Architecture**, donde la estructura de carpetas revela la intención del negocio. El código se organiza en módulos de dominio dentro de `src/`, manteniendo la lógica de negocio aislada de la infraestructura de Next.js.

### 📁 Organización de la Capa `src/`
Para garantizar el desacoplamiento, cada dominio gestiona sus propios componentes, tipos y servicios:

* **`src/tenants/`**: Gestión de organizaciones, validación de identidad y .
* **`src/projects/`**: Lógica de proyectos, componentes de listado/detalle y gestión de estados.
* **`src/dashboard/`**: Capa de servicios analíticos. Contiene lógica para procesar métricas consumiendo datos de otros servicios (ej. `getTotalProjectsForTenant`, `getProjectsStatusCount`).
* **`src/ui/`**: Librería de componentes puramente visuales (presentacionales) desacoplados del dominio.

---

## 🛠️ Decisiones Técnicas Clave

### 1. Estrategia Multi-tenant: "Isolating Databases"
El sistema está diseñado bajo la premisa de un **aislamiento de datos estricto**.

* **Modelo de Datos**: Aunque actualmente se utilizan mocks, la arquitectura está preparada para que cada Tenant sea procesado de forma idéntica pero consuma una fuente de datos (o base de datos) independiente.
* **Resolución Dinámica**: El tenant se resuelve mediante el segmento dinámico `[tenant]` de la URL, validando siempre la existencia de la organización antes de procesar el renderizado.
* **Seguridad**: Se implementaron validaciones en servidor para asegurar que los recursos (proyectos) pertenezcan legítimamente al tenant en la URL, evitando el cruce de información.

### 2. Capa de Servicios de Dashboard (Analytics)
Se separó la lógica de métricas en un servicio dedicado dentro de `src/dashboard/service/` para no sobrecargar los componentes y permitir la reutilización de lógica:

* **`getTotalProjectsForTenant`**: Calcula la cantidad total de propiedades vinculadas a una inmobiliaria.
* **`getProjectsStatusCount`**: Procesa la segmentación de proyectos (Activos vs. Archivados) para visualización de indicadores clave. (no obligatorio, pero suma para una mejor interfaz y experiencia de usuario).

### 3. Estado Visual vs. Persistencia
* **Interactividad**: La funcionalidad de "Cambiar Estado" (Activar/Archivar) se maneja mediante estado local de React (`useState`).
* **Justificación**: Se priorizó demostrar el manejo de eventos y la reactividad de la UI. La persistencia real fue delegada al Roadmap de escalabilidad mediante futuras implementaciones de Server Actions.

### 4. Separación Server y Client Components
* **Server Components**: Encargados del fetching de datos, resolución de promesas de `params` / `searchParams` y lógica de seguridad.
* **Client Components**: Reducidos al mínimo necesario (interacciones de botones, estados de carga locales y toggles) para maximizar la velocidad de carga y el SEO técnico.

---

## 🚀 Próximos Pasos & Escalabilidad (Roadmap)

Con más tiempo de desarrollo, el proyecto escalaría mediante:

1. **Persistencia Real**: Implementación de persistencia de datos y estados mediante el uso de **Cookies** y      **Server Actions**, permitiendo mantener la configuración del usuario y del tenant de forma eficiente sin depender de una infraestructura de base de datos externa en esta etapa.
2.  **Sistema CRUD Robusto**: Interfaz completa para la creación, edición y eliminación física de proyectos inmobiliarios.
3.  **Rol de SuperAdmin**: Panel global para administrar la totalidad de los tenants, métricas globales de la plataforma y gestión de usuarios.
4.  **i18n (Internacionalización)**: Soporte multi-idioma para permitir la expansión del SaaS a clientes internacionales.
5.  **Autenticación & RBAC**: Integración de **NextAuth.js** con control de acceso basado en roles por cada organización.
6. **Desacoplamiento de Vistas (Page Isolation)**
* **Objetivo**: Reducir el "ruido" visual y la complejidad dentro del directorio `app/`.
* **Estrategia**: Dejar los archivos `page.tsx` exclusivamente para la **obtención de datos** (llamadas a servicios `get`) y delegar toda la estructura HTML/Tailwind a componentes de **Vista** especializados dentro de `src/` (ej. `ProjectsView.tsx`).
* **Beneficio**: Separa la lógica de "qué datos se cargan" de "cómo se ven". Esto facilita el mantenimiento, permite testear las interfaces de forma aislada y hace que el código sea mucho más legible para otros desarrolladores.
---

## 🛠️ Tecnologías Usadas

* **Next.js 15** (App Router & Async Params)
* **TypeScript** (Tipado estricto de dominio y seguridad en tiempo de compilación)
* **Tailwind CSS** (Sistema de Grid y diseño responsivo basado en utilidades)

---

## 🌐 Deploy

La aplicación está en proceso de ser desplegada en **Netlify**.

> [!IMPORTANT]
> **Nota sobre Errores**: Si intentas acceder a un tenant o proyecto inexistente, el sistema activará los límites de error personalizados (**Nested Not-Found**) manteniendo el layout institucional para no romper la experiencia de usuario.