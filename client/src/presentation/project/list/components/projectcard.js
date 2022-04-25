import React from "react";
import TagsList from "../../../application/components/tags-list";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ProjectCard(props) {
  const [ cookies ] = useCookies();

  const isOwner = cookies.session && cookies.session._id == props.project.userid;

  let navigate = useNavigate()

  function navigateToEdit() {
    navigate("/edit/" + props.project.userid)
  }

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
          { isOwner && <button class="btn btn-active btn-secondary" onClick={navigateToEdit}>Edit</button>}
          <button class="btn btn-primary" onClick={()=>props.showDetails(props.project)}>View</button>
        </div>
      </div>
    </div>
  )
}
