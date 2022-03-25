import React from "react";

export default function ProjectCard() {
  return (
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Project title!</h2>
        <p>Project description</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  )
}
