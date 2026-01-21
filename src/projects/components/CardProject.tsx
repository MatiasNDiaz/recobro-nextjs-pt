"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Project } from "../types/typesProjects";

interface CardProps extends Project {
  onToggle?: () => void;
}

export const CardProject = ({ id, name, tenant_id, status, onToggle }: CardProps) => {
  const params = useParams();
  const tenant = params?.tenant;

  return (
    /* Quitamos el m-auto y dejamos que el contenedor padre maneje el centrado */
    <div className="relative group w-full max-w-65">
      <Link href={`/${tenant}/projects/${id}`} className="block">
        <div className="flex flex-col items-start h-72 p-5 rounded-2xl shadow-md bg-white border border-transparent hover:border-blue-300 transition-all">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
            Proyecto {id}
          </p>
          
          {/* h-16 asegura que el espacio del título sea constante aunque el nombre sea corto */}
          <h2 className="text-lg font-bold text-gray-800 mt-2 leading-tight h-16 overflow-hidden line-clamp-3">
            {name}
          </h2>
          
          <p className="text-gray-500 text-xs mt-1">Cliente ID: {tenant_id}</p>
          
          <div className="flex items-center gap-2 mt-4">
            <span className={`w-2.5 h-2.5 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
            <p className={`text-xs font-bold uppercase ${status === 'active' ? 'text-green-600' : 'text-orange-500'}`}>
              {status}
            </p>
          </div>

          <div className="mt-auto w-full pt-4">
            {onToggle && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggle();
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm border ${
                  status === 'active' 
                    ? 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-100' 
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-100'
                }`}
              >
                {status === 'active' ? '📦 Archivar' : '✅ Activar'}
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};