import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../../../../data/repositories/projects-repository";

export default function ConfirmDeleteAlert(props) {
  let navigate = useNavigate();

  async function confirmDelete() {
    try {
      await deleteProject(props.project_id);

      navigate(`/`);
    } catch (error) {
      props.setError(error);
    }
  }
  return (
    <div className="alert alert-warning shadow-lg mb-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Deleting a project is permanent.</span>
      </div>
      <div className="flex-none">
        <button className="btn btn-sm btn-ghost" onClick={props.cancellation}>Cancel</button>
        <button className="btn btn-sm btn-error" onClick={confirmDelete}>Delete</button>
      </div>
    </div>
  );
}

