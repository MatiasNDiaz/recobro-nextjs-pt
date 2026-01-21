import { getProjectById } from "@/src/projects/service/projectService";    ;
import { getTenantByName } from "@/src/tenants/service/tenantsService";
import { notFound } from "next/navigation";
import { CardProject } from "@/src/projects/components/CardProject";
import Link from "next/link";


export default async function ProjectDetailPage ({ params }:{ params: {id: string, tenant: string} }){
    const {id, tenant} = await params

   // 1. Buscamos el objeto Tenant
    const Tenant = getTenantByName(tenant);

    // 2. VALIDACIÓN CRUCIAL: Si no existe, disparamos notFound() inmediatamente
    // Esto evita que el código siga bajando y trate de leer Tenant.id
    if (!Tenant) {
        notFound();
    }

    // 3. Si llegamos aquí, sabemos con seguridad que Tenant existe
    const projectId = Number(id);
    const tenantId = Tenant.id; // Ya no necesitas el "!" porque ya validamos arriba
    
    const project = getProjectById(tenantId, projectId);

    // 4. Validamos si el proyecto existe para ese tenant
    if (!project) {
        notFound();
    }
    return(
        <div>
            <Link href={`/${tenant}/dashboard`} className="text-ls text-blue-600 ml-7"> 🡠 volver</Link> 
        <h2 className='text-3xl font-semibold text-gray-900 m-auto w-fit  mt-7 mb-5 '>
            Detalle Proyecto N°{projectId}: <span className="text-blue-600"> {project.name}</span>
        </h2>

            <CardProject 
                id={project.id} 
                name={project.name} 
                tenant_id={project.tenant_id} 
                status={project.status} 
                />
        </div>
    );
} 