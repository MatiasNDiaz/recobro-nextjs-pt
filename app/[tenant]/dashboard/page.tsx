import { getTenantByName } from "@/src/tenants/service/tenantsService";
import { getTotalProjectsForTenant, getProjectsStatusCount } from "@/src/dashboard/service/dashboardService";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage({ params, searchParams }: { params: Promise<{ tenant: string }>, searchParams: Promise<{ status?: string }> }) {
    const { tenant } = await params;
    const { status } = await searchParams;
    console.log("estado: ", status === "active" ? "active" : status === "archived" ? "archived" : "todos");
    
    const Tenant = getTenantByName(tenant);
    if (!tenant || !Tenant) {
        notFound();
    }

    const tenantId = Tenant.id;
    const totalProjects = getTotalProjectsForTenant(tenantId);
    const projectsStatus = getProjectsStatusCount(tenantId);

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
            {/* Cabecera del Dashboard */}
            <header className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Bienvenido, <span className="text-blue-600">{Tenant.name}</span>
                </h1>
                <p className="text-gray-500 mt-2">Aquí tienes el resumen de tu actividad empresarial.</p>
            </header>

            {/* Contenedor de Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                
                {/* Card: Total - Lleva a la lista completa */}
                <Link href={`/${tenant}/projects`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-gray-500 flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1">
                        <span className="text-gray-700 text-sm font-semibold uppercase tracking-wider">Total Proyectos</span>
                        <div className="flex items-end justify-between mt-4">
                            <h2 className="text-5xl font-black text-gray-800">{totalProjects}</h2>
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Card: Activos - Lleva a proyectos con filtro active */}
                <Link href={`/${tenant}/projects?status=active`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-green-500 border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1">
                        <span className="text-green-600 text-sm font-semibold uppercase tracking-wider">Proyectos Activos</span>
                        <div className="flex items-end justify-between mt-4">
                            <h2 className="text-5xl font-black text-green-700">{projectsStatus.active}</h2>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Card: Archivados - Lleva a proyectos con filtro archived */}
                <Link href={`/${tenant}/projects?status=archived`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-orange-400 border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1">
                        <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">Archivados</span>
                        <div className="flex items-end justify-between mt-4">
                            <h2 className="text-5xl font-black text-orange-600">{projectsStatus.archived}</h2>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
}