import React, { useEffect } from "react";
import NewProjectViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";
import TagsList from "../../application/components/tags-list";

export default function ProjectNew() {
  const {saveProject, name, description, url, tags, onChange, error } = NewProjectViewModel();

  return (
    <div className="md:container md:mx-auto p-2">
      {error &&
        <ErrorAlert message={error.message} />
      }
      <div className="grid grid-cols-1 gap-6">
        <div className="card shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-3xl">Upload a new project</h1>
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
              <button
                className="btn btn-primary"
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

