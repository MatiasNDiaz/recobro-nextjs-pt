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

### 1. 🌐 Enfoque Multi-tenant Detallado: Aislamiento Físico 
A diferencia de un enfoque tradicional de aislamiento lógico (donde todos los datos conviven en una misma tabla filtrados por un ID), este proyecto ha sido diseñado bajo el patrón **Database-per-Tenant**.

### 🛠️ Estrategia de Arquitectura
La aplicación utiliza un modelo de **separación física de datos**, lo que garantiza que la información de cada organización resida en su propio contenedor de datos independiente.

* **Aislamiento Total**: Se mitiga el riesgo de filtración de datos entre clientes (Cross-tenant data leakage), ya que no existen consultas que mezclen registros de diferentes organizaciones.
* **Escalabilidad Independiente**: El diseño permite que cada base de datos crezca, se respalde o se mueva a diferentes nodos de infraestructura de forma aislada según la demanda del tenant.
* **Mantenibilidad de Esquemas**: Facilita la evolución del modelo de datos por cliente sin impactar la disponibilidad global del SaaS.

### 🔄 Implementación en el Proyecto
Actualmente, esta lógica se ve reflejada en la estructura de `src/tenants/data/` y `src/projects/data/`, donde cada archivo actúa como un **esquema de base de datos independiente**.

1.  **Resolución de Conexión**: Los servicios (`tenantsService.ts` y `projectService.ts`) actúan como un **Router de Datos**.
2.  **Aislamiento en Servicios**: Al recibir el parámetro de la URL, el sistema selecciona la fuente de datos específica para ese tenant.
3.  **Preparación para Producción**: En un entorno real, la carpeta `data/` sería reemplazada por un *Pool de Conexiones* dinámico que, basándose en el nombre del tenant, abriría un túnel exclusivo hacia la base de datos (PostgreSQL/MongoDB) correspondiente a dicha organización.

> **Criterio Técnico**: Este enfoque garantiza que el código sea extremadamente limpio y seguro, ya que las funciones de negocio operan sobre un set de datos que ya ha sido físicamente aislado antes de llegar a la lógica de aplicación.

### 2. 🏗️ Implementación y Escalabilidad

Actualmente, esta lógica se refleja en la estructura de `src/tenants/data/` y `src/projects/data/`, donde cada archivo actúa como un **esquema de base de datos independiente**.

* **Resolución de Conexión**: Los servicios (`tenantsService.ts` y `projectService.ts`) actúan como un **Router de Datos**, seleccionando la fuente específica según el contexto de la URL.
* **Preparación para Producción**: En un entorno real, la capa de `data/` sería reemplazada por un **Pool de Conexiones dinámico** que abra un túnel exclusivo hacia la base de datos (**PostgreSQL/MongoDB**) correspondiente al tenant detectado.
* **Mantenibilidad**: Este diseño facilita la evolución del modelo de datos por cliente y permite una **escalabilidad independiente**, permitiendo mover tenants con alta demanda a nodos o servidores dedicados sin afectar al resto de la plataforma.

### 3. Capa de Servicios de Dashboard (Analytics)
Se separó la lógica de métricas en un servicio dedicado dentro de `src/dashboard/service/` para no sobrecargar los componentes y permitir la reutilización de lógica:

* **`getTotalProjectsForTenant`**: Calcula la cantidad total de propiedades vinculadas a una inmobiliaria.
* **`getProjectsStatusCount`**: Procesa la segmentación de proyectos (Activos vs. Archivados) para visualización de indicadores clave. (no obligatorio, pero suma para una mejor interfaz y experiencia de usuario).

### 4. Estado Visual vs. Persistencia
* **Interactividad**: La funcionalidad de "Cambiar Estado" (Activar/Archivar) se maneja mediante estado local de React (`useState`).
* **Justificación**: Se priorizó demostrar el manejo de eventos y la reactividad de la UI. La persistencia real fue delegada al Roadmap de escalabilidad mediante futuras implementaciones de Server Actions.

### 5. Separación Server y Client Components
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