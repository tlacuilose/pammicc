import React, { useEffect } from "react";
import ProjectListViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";
import ProjectCard from "./components/projectcard";
import ProjectDetail from "./components/projectDetail"
import Modal from '@mui/material/Modal';

export default function ProjectList() {
  const { projects, error, getProjects } = ProjectListViewModel();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (project) => setOpen({ state: true, project: project });
  const handleClose = () => setOpen(false);


  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div class="md:container md:mx-auto p-2 pb-8">
      {error ?
        <ErrorAlert message="Failed to fetch projects" />
        :
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project) => {
            return <li key={project.id}><ProjectCard showDetails={handleOpen} project={project} /></li>
          })}
        </ul>
      }
      <Modal open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProjectDetail showDetails={{}} project={open.project} close={handleClose}/>

      </Modal>
    </div>

  );
}
