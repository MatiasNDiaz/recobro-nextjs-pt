import { notFound } from "next/navigation";
import { getTenantByName } from "@/src/tenants/service/tenantsService";
import { getProjectsByTenantId } from "@/src/projects/service/projectService";
import { ListProject } from "@/src/projects/components/ListProjects";
import Link from "next/link";

export default async function ProjectsPage({ 
  params, // obtenemos los parametros de la ruta dinámica
  searchParams // obtenemos los parametros luego del signo "?" en la URL
}: { 
  params: Promise<{ tenant: string }>,
  searchParams: Promise<{ status?: string }> 
}) {
    // 1. EXTRAER los datos de las promesas (Obligatorio en Next.js 15)
    const { tenant } = await params;
    const { status } = await searchParams;

    // 2. BUSCAR el tenant y sus proyectos
    const Tenant = getTenantByName(tenant); // objeto tenant {id, name}
    if (!Tenant) notFound();

    let projects = getProjectsByTenantId(Tenant.id);

    // 3. FILTRAR la lista según lo que llegó por la URL
    // Si status es "active", solo quedan los activos. Si es undefined, quedan todos.
    if (status === 'active' || status === 'archived') {
        projects = projects.filter(p => p.status === status);
    }

    return (
    <>
        <Link href={`/${tenant}/dashboard`} className="text-ls text-blue-600 ml-7"> 🡠 volver</Link> 
        
        <div className="p-8 bg-gray-50 min-h-screen">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Proyectos de {Tenant.name}
                </h1>
                <p className="text-gray-500">
                    Viendo: <span className="font-semibold text-blue-600">
                        {status ? status.toUpperCase() : "TODOS"}
                    </span>
                </p>
            </header>
            
            {/* 4. PASAR la lista ya filtrada al componente visual */}
            <ListProject projects={projects} />
        </div>
    </>
    );
}