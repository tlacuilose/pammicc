import React, { useContext } from "react";
import TagsList from "../../../application/components/tags-list";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../application/contexts/auth-context";

const dimensions = ["BOUNDED CS", "THRESHOLD CS", "FULL-CYCLE CS"]

export default function ProjectCard(props) {
  const { authUser } = useContext(AuthContext);

  const isOwner = authUser && (authUser.id === props.project.userid || authUser.role === "admin");

  let navigate = useNavigate()

  function navigateToEdit() {
    navigate("/edit/" + props.project.id)
  }
  //computing the components dimensions average
  let average = (props.project.ctxt_awareness + props.project.citzn_engmnt + props.project.infstctr_lvrage + props.project.tech_innovation + props.project.ed_innovation + props.project.outreach_scale + props.project.ntwork_blding + props.project.complex_thinking) / 8

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title h-32 overflow-hidden">{props.project.name}</h2>
        <p>Project maturity : {dimensions[Math.round(average || 0) - 1]}</p>
        <p className="h-32 overflow-hidden">{props.project.description.substring(0, 100) + "..."}</p>
        <p className="h-24 overflow-hidden">
          Project link:<br />
          <a
            className="link link-primary"
            href={props.project.url}
          >
            {props.project.url}
          </a>
        </p>
        <div className="overflow-y-auto h-24">
          <TagsList tags={props.project.tags} />
        </div>
        <div className="card-actions justify-end">
          {isOwner && <button className="btn btn-active btn-secondary" onClick={navigateToEdit}>Edit</button>}
          <button className="btn btn-primary" onClick={() => props.showDetails(props.project)}>View</button>
        </div>
      </div>
    </div>
  )
}
