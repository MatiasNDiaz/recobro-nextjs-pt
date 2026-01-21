"use client"; // Pasamos a Client Component para usar usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react"; // Para desvincular params en componentes de cliente

export default function TenantLayout({ children, params }: { children: React.ReactNode, 
  params: Promise<{ tenant: string }> 
}) {
  const { tenant } = use(params); // En Client Components usamos 'use' para las promesas de params
  const pathname = usePathname();

  // Función para definir si el link está activo
  const isActive = (path: string) => pathname.includes(path);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Superior */}
      <nav className="bg-white shadow-sm p-4 border-b border-gray-200">
        <h1 className="font-bold text-gray-700 text-xl">Panel de Control: <span className="text-blue-600 uppercase">{tenant}</span></h1>
      </nav>

      <div className="flex flex-1 ">
        {/* Sidebar Lateral */}
        <aside className="w-64 bg-white border-gray-300 border-r-2 p-6 rounded-tr-xl mt-2">
          <ul className="flex flex-col gap-4">
            <li>
              <Link 
                href={`/${tenant}/dashboard`} 
                className={`block p-3 rounded-lg transition-colors border-b border-gray-200 font-medium rounded-br-xl mt-2 ${
                  isActive('/dashboard') 
                    ? 'bg-gray-200 text-gray-900 border-gray-400' // Color gris más oscuro para activo
                    : 'hover:bg-blue-50 hover:text-blue-600 text-gray-600'
                }`}
              >
                Resumen
              </Link>
            </li>
            <li>
              <Link 
                href={`/${tenant}/projects`} 
                className={`block p-3 rounded-lg transition-colors border-b border-gray-200 font-medium rounded-br-xl ${
                  isActive('/projects') 
                    ? 'bg-gray-200 text-gray-900 border-gray-400' // Color gris más oscuro para activo
                    : 'hover:bg-blue-50 hover:text-blue-600 text-gray-600'
                }`}
              >
                Proyectos
              </Link>
            </li>
             <li>
              <Link 
                href={`/`} 
                className={`block p-3 rounded-lg transition-colors border-b border-gray-200 font-medium rounded-br-xl ${
                     'hover:bg-blue-50 hover:text-blue-600 text-gray-600'
                }`}
              >
                Volver al Inicio
              </Link>
            </li>
          </ul>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>

      <footer className="p-4 text-center bg-white border-t border-gray-100">
        <h2 className="text-gray-400 text-xs tracking-widest uppercase">Inmobiliaria Pro © 2026</h2>
      </footer>
    </div>
  );
}