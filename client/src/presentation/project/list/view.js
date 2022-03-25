import React, { useEffect } from "react";
import ProjectListViewModel from "./viewmodel";
import ProjectCard from "./components/projectcard";
import ErrorAlert from "../../application/components/error-alert";

export default function ProjectList() {
  const {projects, error, getProjects} = ProjectListViewModel();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div class="md:container md:mx-auto p-2">
    {error  ?
      <ErrorAlert message="Failed to fetch projects" />
      :
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        { projects.map((project) => {
          return <li key={project.id}><ProjectCard project={project}/></li>
        })}
      </ul>
    }
    </div>
  );
}

