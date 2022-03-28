import React, { useEffect } from "react";
import NewProjectViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";
import TagsList from "../../application/components/tags-list";

export default function ProjectNew() {
  const {saveProject, name, description, url, tags, onChange, error } = NewProjectViewModel();

  return (
    <div class="md:container md:mx-auto p-2">
      {error &&
        <ErrorAlert message={error.message} />
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

