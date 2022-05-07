import React, { useContext } from "react";
import TagsList from "../../../application/components/tags-list";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../application/contexts/auth-context";

export default function ProjectCard(props) {
  const { authUser } = useContext(AuthContext);

  const isOwner = authUser && authUser.id === props.project.userid;

  let navigate = useNavigate()

  function navigateToEdit() {
    navigate("/edit/" + props.project.id)
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title h-32 overflow-hidden">{props.project.name}</h2>
        <p className="h-32 overflow-hidden">{props.project.description.substring(0, 100) + "..."}</p>
        <p className="h-24 overflow-hidden">
          Project link:<br/>
          <a 
            className="link link-primary"
            href={props.project.url}
          >
            {props.project.url}
          </a>
        </p>
        <TagsList tags={props.project.tags} />
        <div className="card-actions justify-end">
          { isOwner && <button className="btn btn-active btn-secondary" onClick={navigateToEdit}>Edit</button>}
          <button className="btn btn-primary" onClick={()=>props.showDetails(props.project)}>View</button>
        </div>
      </div>
    </div>
  )
}
