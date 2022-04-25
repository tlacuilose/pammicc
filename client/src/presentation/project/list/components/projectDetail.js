import React from "react";
import TagsList from "../../../application/components/tags-list";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ProjectCard(props) {
  const [ cookies ] = useCookies();

  const isOwner = cookies.session._id == props.project.userid;

  let navigate = useNavigate();

  return (
    <div class="card w-150 bg-base-100 shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 background-blue">
      <div class="card-body snap-center">
        <h2 class="card-title">{props.project.name}</h2>
        <p>{props.project.description}</p>
        <p>
          Project link:<br />
          <a
            class="link link-primary"
            href={props.project.url}
          >
            {props.project.url}
          </a>
        </p>
        <TagsList tags={props.project.tags} />
        <div class="card-actions justify-end">
          { isOwner && <button class="btn btn-active btn-secondary" onClick={()=>navigate(`/edit`)}>Edit</button>}
          <button class="btn btn-primary" onClick={props.close}>Close</button>
        </div>
      </div>
    </div>
  )
}
