import React, { useEffect } from "react";
import NewProjectViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";

export default function ProjectNew() {
  const {saveProject, name, description, onChange, error } = NewProjectViewModel();

  return (
    <div class="md:container md:mx-auto p-2">
      {error &&
        <ErrorAlert message="Failed to save project" />
      }
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-2xl bg-base-100">
          <div class="card-body">
            <h1 class="card-title text-3xl">Upload a new project</h1>
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
            <div class="form-control mt-6">
              <button
                class="btn btn-primary"
                onClick={saveProject}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

