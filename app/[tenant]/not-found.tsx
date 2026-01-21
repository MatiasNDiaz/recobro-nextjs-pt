"use client";
import { usePathname } from "next/navigation";
import { NotFoundView } from "@/src/ui/NotFoundView";

export default function TenantNotFound() {
  const pathname = usePathname(); // Ejemplo: "/EmpresaFalsa/projects/999"
  
  // Dividimos la URL para obtener las partes
  const segments = pathname.split("/").filter(Boolean);
  const tenantName = segments[0]; // El primer segmento suele ser el tenant
  const isProjectError = segments.includes("projects");
  const lastSegment = segments[segments.length - 1];

  let customMessage = `La organización "${tenantName}" no existe.`;

  if (isProjectError && lastSegment !== "projects") {
    customMessage = `El proyecto con ID "${lastSegment}" no existe en ${tenantName}.`;
  }

  return (
    <div className=" flex items-center justify-center">
       <NotFoundView message={customMessage} />
    </div>
  );
}