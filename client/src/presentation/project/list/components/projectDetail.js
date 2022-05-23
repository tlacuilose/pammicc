import React, { useContext } from "react";
import TagsList from "../../../application/components/tags-list";
import MaturityTable from "./MaturityTable"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../application/contexts/auth-context";

const dimensions = ["BOUNDED CS", "THRESHOLD CS", "FULL-CYCLE CS"]


const ProjectDetail = React.forwardRef((props, ref) => {
  const { authUser } = useContext(AuthContext);

  const isOwner = authUser && (authUser.id === props.project.userid || authUser.role === "admin");

  let navigate = useNavigate()

  function navigateToEdit() {
    navigate("/edit/" + props.project.id)
  }
  let average = (props.project.ctxt_awareness + props.project.citzn_engmnt + props.project.infstctr_lvrage + props.project.tech_innovation + props.project.ed_innovation + props.project.outreach_scale + props.project.ntwork_blding + props.project.complex_thinking) / 8 
  return (
    <div className="card bg-base-100 shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 background-blue max-w-5xl">
      <div className="card-body snap-center">
        <h2 className="card-title overflow-y-auto max-h-[15vh]">{props.project.name}</h2>
        <p className="overflow-y-auto max-h-[20vh]">{props.project.description}</p>
        <p>
          Project link:<br />
          <a
            className="link link-primary"
            href={props.project.url}
          >
            {props.project.url}
          </a>
        </p>
        <p>Project maturity : {dimensions[Math.round(average || 0) - 1]}</p>
        <div className="overflow-y-auto max-h-[35vh]">
          <MaturityTable project={props.project} editing={false}/>
        </div>
        <div className="overflow-y-auto max-h-[15vh]">
          <TagsList tags={props.project.tags} />
        </div>
        <div className="card-actions justify-end overflow-x-hidden">
          {isOwner && <button className="btn btn-active btn-secondary" onClick={navigateToEdit}>Edit</button>}
          <button className="btn btn-primary" onClick={props.close}>Close</button>
        </div>
      </div>
    </div>
  )
});

export default ProjectDetail;
