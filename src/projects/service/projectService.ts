import { tenant_1_projects } from "../data/tenant_1_projects"
import { tenant_2_projects } from "../data/tenant_2_projects"
import { tenant_3_projects } from "../data/tenant_3_projects"
import { tenant_4_projects } from "../data/tenant_4_projects"

import { Project } from "../types/typesProjects";


export const getProjectsByTenantId = (tenantId: number): Project[] => {
  if (!tenantId || typeof tenantId !== "number") return [];

  const projectsMap: Record<number, Project[]> = {
    1: tenant_1_projects as Project[],
    2: tenant_2_projects as Project[],
    3: tenant_3_projects as Project[],
    4: tenant_4_projects as Project[],
  };

  return projectsMap[tenantId] || [];
};

export const getProjectById = (tenantId: number, id: number): Project | undefined => {
    if (!tenantId || !id) return undefined;
    const allProjects = getProjectsByTenantId(tenantId)
    return allProjects.find( project => project.id === id)

};
