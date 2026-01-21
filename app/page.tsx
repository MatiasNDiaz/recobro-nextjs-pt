import './globals.css';
import Link from 'next/link';
import { tenants } from '@/src/tenants/service/tenantsService';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Banner Superior */}
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Hola Recobro! 👋
          </h1>
          <p className="text-blue-100 mt-2 text-lg">
            Prueba Técnica: Dashboard SaaS Multi-tenant
          </p>
        </div>

        <div className="p-8">
          <section className="mb-8 text-center">
            <p className="text-gray-600 leading-relaxed">
              Muchas gracias por la oportunidad. He diseñado esta solución enfocada en la 
              <span className="font-semibold text-gray-800"> escalabilidad y separación de conceptos</span>. 
              Por favor, selecciona una organización para explorar el dashboard:
            </p>
          </section>

          {/* Selector de Tenants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {tenants.map((tenant) => (
              <Link 
                key={tenant.id} 
                href={`/${tenant.name}/dashboard`}
                className="group p-5 border-2 bg-gray-100 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex items-center  justify-between">
                  <div>
                    <h2 className="font-bold text-gray-800 group-hover:text-blue-700 uppercase">
                      {tenant.name}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">ID Organizacional: {tenant.id}</p>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    🡢
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer de la Card con Stack */}
          <footer className="border-t border-gray-100 pt-6">
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 border text-xs font-medium rounded-full hover:border-blue-400 hover:border hover:text-blue-500">Next.js 15 (App Router)</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 border text-xs font-medium rounded-full hover:border-blue-400 hover:border hover:text-blue-500">TypeScript</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 border text-xs font-medium rounded-full hover:border-blue-400 hover:border hover:text-blue-500">Tailwind CSS</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 border text-xs font-medium rounded-full hover:border-blue-400 hover:border hover:text-blue-500">Clean Architecture</span>
            </div>
          </footer>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-sm">
        Desarrollado con criterio técnico para el proceso de selección de <strong>Recobro</strong>.
      </p>
    </main>
  );
}