import React from "react";
import ProjectCard from "./components/projectcard";

export default function ProjectList() {
  return (
    <div class="md:container md:mx-auto p-2">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
      </div>
    </div>
  );
}

