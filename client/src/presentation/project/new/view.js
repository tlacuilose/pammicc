import React, { useEffect } from "react";
import NewProjectViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";
import TagsList from "../../application/components/tags-list";
import MaturityTable from "../list/components/MaturityTable"

export default function ProjectNew() {
  const { saveProject, name, description, url, tags, ctxt_awareness, citzn_engmnt, infstctr_lvrage, tech_innovation, ed_innovation, outreach_scale, ntwork_blding, complex_thinking, onChange, onChangeComponent, error } = NewProjectViewModel();

  const components = {
    ctxt_awareness: ctxt_awareness,
    citzn_engmnt: citzn_engmnt,
    infstctr_lvrage: infstctr_lvrage,
    tech_innovation: tech_innovation,
    ed_innovation: ed_innovation,
    outreach_scale: outreach_scale,
    ntwork_blding: ntwork_blding,
    complex_thinking: complex_thinking
  }

  const handleUpdateComponent = (component, newValue) => {
    onChangeComponent(component, newValue)
  }

  let completionCounter = '(' + Object.values(components).reduce((p, c) => (c > 0) ? p + 1 : p, 0) + '/' + Object.keys(components).length + ')';

  return (
    <div className="md:container md:mx-auto p-2">
      {error &&
        <ErrorAlert message={error.message} />
      }
      <div className="grid grid-cols-1 gap-6">
        <div className="card shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-3xl">Upload a new project</h1>
            <h2 className="card-title text-xl text-primary">Please fill in all fields and complete the table.</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">1. Project name</span>
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
                <span className="label-text">2. Project description</span>
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
                <span className="label-text">3. Project url</span>
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
                <span className="label-text">4. Project tags (separate each tag with a comma.)</span>
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
            <h1 className="card-title text-xl my-4">5. Select the dimension that best describes each component: {completionCounter}</h1>
            <MaturityTable project={components} editing={true} updateComponent={handleUpdateComponent} />
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

