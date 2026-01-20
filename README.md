# <span style="color:#1E90FF">Recobro Next.js PT</span>

**Prueba técnica de Next.js para Recobro:** un Dashboard SaaS **multi-tenant** con separación clara entre **Server y Client Components** y arquitectura escalable.

---

## <span style="color:#32CD32">Enfoque Multi-Tenant</span>

- Todos los tenants comparten la misma lógica y procesos de la aplicación.  
- Cada tenant tiene su **fuente de datos aislada** (simulada con archivos separados), garantizando que la información de un tenant no se mezcle con la de otro.  
- La estructura permite reemplazar fácilmente los datos mock por **bases de datos reales** en el futuro.

---

## <span style="color:#FF8C00">Arquitectura y Organización de Carpetas</span>

- La aplicación sigue la **Screaming Architecture**, organizando el código por dominio en lugar de por tipo técnico.  
- Cada dominio tiene:
  - **Capa de servicio**: lógica de negocio.  
  - **Capa de repositorio**: gestión de datos e infraestructura.  
- Los **Server Components** se encargan del fetching y resolución del tenant desde la URL.  
- Los **Client Components** manejan la interacción del usuario y el estado de UI.  
- Los datos mock se encuentran en carpetas `data/` por tenant, facilitando el aislamiento y la escalabilidad.

- La carpeta `src/` contiene los dominios principales:  
  - `dashboard/`  
  - `projects/`  
  - `tenants/`  
  - `ui/`  

Cada dominio agrupa sus componentes y lógica correspondiente, manteniendo el proyecto organizado y fácil de escalar.

---

## <span style="color:#DC143C">Páginas Dinámicas</span>

La aplicación cuenta con tres **Server Components** principales:

1. **DashboardPage (`/[tenant]/dashboard`)**  
   Muestra información general del tenant.

2. **ProjectsPage (`/[tenant]/projects`)**  
   Lista todos los proyectos de un tenant.

3. **ProjectDetailPage (`/[tenant]/projects/[id]`)**  
   Muestra el detalle de un proyecto específico.

- Los parámetros dinámicos (`tenant` e `id`) se reciben desde la URL y se desestructuran dentro de cada página.  
- Esto garantiza que cada tenant vea únicamente sus propios datos y permite una futura integración con bases de datos reales sin modificar la lógica de presentación.
