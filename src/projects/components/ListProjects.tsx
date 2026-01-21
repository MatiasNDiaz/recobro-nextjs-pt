"use client";
import { useState } from "react";
import { Project } from "../types/typesProjects";
import { CardProject } from "./CardProject";

export const ListProject = ({ projects: initialProjects }: { projects: Project[] }) => {
    const [projects, setProjects] = useState<Project[]>(initialProjects);

    const handleToggleStatus = (projectId: number) => {
        setProjects(prev => prev.map(p => 
            p.id === projectId 
                ? { ...p, status: p.status === 'active' ? 'archived' : 'active' } 
                : p
        ));
    };

    return (
        /* Usamos grid con auto-fill para que las tarjetas siempre midan lo mismo */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 rounded-2xl bg-gray-100/50">
            {projects.map((project) => (
                <div key={project.id} className="flex justify-center">
                    <CardProject
                        {...project}
                        onToggle={() => handleToggleStatus(project.id)}
                    />
                </div>
            ))}
        </div>
    );
};