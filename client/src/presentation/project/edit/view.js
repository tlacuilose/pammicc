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
    <div class="md:container md:mx-auto p-2">
      {showConfirmDelete &&
        <ConfirmDeleteAlert project_id={id} cancellation={cancelDelete} setError={setError}/>
      }
      {error &&
        <ErrorAlert message={error.message} />
      }
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="card-actions justify-between">
              <h1 class="card-title text-3xl">Edit project</h1>
              <button
                class="btn btn-active btn-accent mr-2"
                disabled={showConfirmDelete}
                onClick={askDelete}
              >
                Delete Project
              </button>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Project name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                class="input input-bordered"
                onChange={onChange}
                value={name}
                name="name"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Project description</span>
              </label>
              <input
                type="text"
                placeholder="Description"
                class="input input-bordered"
                onChange={onChange}
                value={description}
                name="description"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Project url</span>
              </label>
              <input
                type="text"
                placeholder="Url"
                class="input input-bordered"
                onChange={onChange}
                value={url}
                name="url"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Project tags</span>
              </label>
              <input
                type="text"
                placeholder="Tags as a comma separated list."
                class="input input-bordered"
                onChange={onChange}
                value={tags}
                name="tags"
              />
            </div>
            <TagsList tags={tags} />
            <div class="form-control mt-6">
              <div class="flex justify-end">
                <button
                  class="btn mr-2"
                  onClick={()=>{navigate(`/`)}}
                >
                  Cancel
                </button>
                <button
                  class="btn btn-wide btn-primary ml-2"
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


