import React from "react";

export default function ProjectNew() {
  return (
    <div class="md:container md:mx-auto p-2">
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-2xl bg-base-100">
          <div class="card-body">
            <h1 class="card-title text-3xl">Upload a new project</h1>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Project name</span>
              </label>
              <input type="text" placeholder="Name" class="input input-bordered"/>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Project description</span>
              </label>
              <input type="text" placeholder="Description" class="input input-bordered"/>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

