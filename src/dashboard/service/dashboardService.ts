import { getProjectsByTenantId } from "@/src/projects/service/projectService";

export const getTotalProjectsForTenant = (tenantId: number) => {
  const projects = getProjectsByTenantId(tenantId);
  return projects.length;
};

// Si querés más métricas, por ejemplo activos vs archivados
export const getProjectsStatusCount = (tenantId: number) => {
  const projects = getProjectsByTenantId(tenantId);
  const active = projects.filter(p => p.status === 'active').length;
  const archived = projects.filter(p => p.status === 'archived').length;
  return { active, archived };
};

