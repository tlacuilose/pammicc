import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import EditProjectViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";
import TagsList from "../../application/components/tags-list";
import ConfirmDeleteAlert from "./components/confirm-delete-alert";

export default function ProjectEdit() {
  const { id } =  useParams();
  const {updateProject, getProjectInfo, name, description, url, tags, onChange, error, setError, showConfirmDelete, askDelete, cancelDelete } = EditProjectViewModel(id);

  let navigate = useNavigate();

  function update() {
    updateProject(id)
  }

  useEffect(() => {
    getProjectInfo(id)
  }, []);

  return (
    <div className="md:container md:mx-auto p-2">
      {showConfirmDelete &&
        <ConfirmDeleteAlert project_id={id} cancellation={cancelDelete} setError={setError}/>
      }
      {error &&
        <ErrorAlert message={error.message} />
      }
      <div className="grid grid-cols-1 gap-6">
        <div className="card shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="card-actions justify-between">
              <h1 className="card-title text-3xl">Edit project</h1>
              <button
                className="btn btn-active btn-accent mr-2"
                disabled={showConfirmDelete}
                onClick={askDelete}
              >
                Delete Project
              </button>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Project name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                onChange={onChange}
                value={name}
                name="name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Project description</span>
              </label>
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered"
                onChange={onChange}
                value={description}
                name="description"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Project url</span>
              </label>
              <input
                type="text"
                placeholder="Url"
                className="input input-bordered"
                onChange={onChange}
                value={url}
                name="url"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Project tags</span>
              </label>
              <input
                type="text"
                placeholder="Tags as a comma separated list."
                className="input input-bordered"
                onChange={onChange}
                value={tags}
                name="tags"
              />
            </div>
            <TagsList tags={tags} />
            <div className="form-control mt-6">
              <div className="flex justify-end">
                <button
                  className="btn mr-2"
                  onClick={()=>{navigate(`/`)}}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-wide btn-primary ml-2"
                  onClick={update}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


