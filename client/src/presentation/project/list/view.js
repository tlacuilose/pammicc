import React, { useEffect } from "react";
import ProjectListViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";
import ProjectCard from "./components/projectcard";
import ProjectDetail from "./components/projectDetail"
import Modal from '@mui/material/Modal';

export default function ProjectList() {
  const { projects, error, getProjects } = ProjectListViewModel();
  const [open, setOpen] = React.useState(false);
  const [openedProject, setOpenedProject] = React.useState(undefined);
  const [filteredProjects, setFilteredProjects] = React.useState(projects)
  const [isSelected, setIsSelected] = React.useState(-1);

  const handleOpen = (project) => {
    setOpen(true);
    setOpenedProject(project);
  }
  const handleClose = () => setOpen(false);


  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects])

  const filterByThreshold = (value) => {
    setIsSelected(value);
    console.log(isSelected);
    if (value === -1) {
      setFilteredProjects(projects);
    }
    else {
      let projectsToFilter = [];
      projectsToFilter = projects.map((project) => {
        project['average'] = Math.round((project.ctxt_awareness + project.citzn_engmnt + project.infstctr_lvrage + project.tech_innovation + project.ed_innovation + project.outreach_scale + project.ntwork_blding + project.complex_thinking) / 8) - 1
        return project;
      })
      projectsToFilter = projectsToFilter.filter((project) => {
        return project.average === value
      })
      setFilteredProjects(projectsToFilter);
    }
  }

  return (
    <div className="md:container md:mx-auto p-2 pb-8">
      <div className="mb-4">
        <button className={isSelected === -1 ? "btn btn-primary mr-2" : "btn btn-selected mr-2"} onClick={() => filterByThreshold(-1)}>ALL</button>
        <button className={isSelected === 0 ? "btn btn-primary mr-2" : "btn btn-selected mr-2"} onClick={() => filterByThreshold(0)}>BOUNDED</button>
        <button className={isSelected === 1 ? "btn btn-primary mr-2" : "btn btn-selected mr-2"} onClick={() => filterByThreshold(1)}>THRESHOLD</button>
        <button className={isSelected === 2 ? "btn btn-primary mr-2" : "btn btn-selected mr-2"} onClick={() => filterByThreshold(2)}>FULL-CYCLE</button>
      </div>
      {error ?
        <ErrorAlert message="Failed to fetch projects" />
        :
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project) => {
            return <li key={project.id}><ProjectCard showDetails={handleOpen} project={project} /></li>
          })}
        </ul>
      }
      <Modal open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-scroll"
      >
        <ProjectDetail showDetails={{}} project={openedProject} close={handleClose}/>
      </Modal>
    </div>
  );
}
