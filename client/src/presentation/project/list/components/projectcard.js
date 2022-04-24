import React from "react";
import TagsList from "../../../application/components/tags-list";


export default function ProjectCard(props) {
  return (
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{props.project.name}</h2>
        <p>{props.project.description.substring(0, 100) + "..."}</p>
        <p>
          Project link:<br/>
          <a 
            class="link link-primary"
            href={props.project.url}
          >
            {props.project.url}
          </a>
        </p>
        <TagsList tags={props.project.tags} />
        <div class="card-actions justify-end">
          <button class="btn btn-primary" onClick={()=>props.showDetails(props.project)}>View</button>
        </div>
      </div>
    </div>
  )
}
