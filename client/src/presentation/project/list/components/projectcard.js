import React from "react";

export default function ProjectCard(props) {
  return (
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{props.project.name}</h2>
        <p>{props.project.description}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  )
}
