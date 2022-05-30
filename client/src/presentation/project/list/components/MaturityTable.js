import React from "react";

const dimensions = [["BOUNDED CS", "(Baseline inputs)"], ["THRESHOLD CS", "(Transition outputs / outcomes)"], ["FULL-CYCLE CS", "(Fulfilment impact)"]]

const components = {
  ctxt_awareness: {
    name: "Context-awareness", content: ["Participation in or replication of an existing project", "Enhancement of an existing project", "Launch of an original topic project"], description: "This  component  refers  to  the  contextual  awareness  of  the  addressed  problem, which  is  reflected  in  controlling  the  proposal's  originality.  A  CS  community  that participates in an existing project or replicates a project from another region remains at  baseline.  Improving  an  existing  project  moves  it  to  the  Threshold  dimension,  and once an original project is generated, it transcends to the Full-cycle CS dimension."
  },
  citzn_engmnt: {
    name: "Citizen engagement", content: ["Passive; follows a leader", "Co-creates a proposal", "Leads a project"], description: "Both  the  participants'  and  the  project  operators'  perspectives  are  covered  in  this component. It entails establishing protocols and procedures such as informed consent and data privacy. Participants progress from a relatively passive position to co-creation and eventually initiative leadership."
  },
  infstctr_lvrage: {
    name: "Infrastructure leverage", content: ["None or minimal interactions within available infrastructure", "Moderated interactions within available infrastructure", "Improves interactions within available infrastructure"], description: "This dimension considers the infrastructure accessible to the project and how the CS  participants'  interactive  dynamics  influence  mobility  between  the  dimensions. Ideally, participants come to improve existing interactions within the infrastructure."
  },
  tech_innovation: {
    name: "Technological innovation", content: ["Passive use of low-level technology", "Adaptation of technology", "Creation of technology and/or use of advanced technologies"], description: "n  this  dimension,  we  address  the  use  or  creation  of  technology  supporting  the project administration, the storage and analysis of the data, and the ability to disseminate the information to the participants. At the Bounded level, general-purpose technology applied to the project is used with no particular development, but project participants can communicate with each other. At the Full-cycle level, we find specialized  software  to  collect  and  analyze  data  or  software  developed  to  suit  the project to meet contextual requirements."
  },
  ed_innovation: {
    name: "Educational innovation", content: ["Lack of educational focus", "Incremental use of educational resources", "Proposes reusable resources for formal / non - formal education"], description: "This component reflects the importance of incorporating new sustainable processes to strengthen education to impact lifelong learning. At the most basic level, CS  initiatives  may  lack  educational  vision.  Using  educational  resources,  participants move  the  projects  to  transcend  the  threshold;  they  propose  reusable  resources  for formal and non-formal education to continue making impacts."
  },
  outreach_scale: {
    name: "Outreach and Scale", content: ["Number of participants: local Number of locations where data is collected: local", "Number of participants: national Number of locations where data is collected: national", "Number of participants: global Number of locations where data is collected: global"], description: "The scope of the project is measured by this component, considering the number of benefited people, the number of citizens participating in the data collection, and the geographical  scope  of  the  data  retrieved  and  analyzed.  At  the  Bounded  level,  CS projects  occur  within  a  locality  with  the  participation  of  citizens  who  live  in  the community. At the Full-cycle level, several global localities participate, and interested citizens living in these communities work at different levels."
  },
  ntwork_blding: {
    name: "Network building", content: ["One or two helixes", "Three-helix interaction", "Four to five helix integration that concludes with Public Policies"], description:""
  },
  complex_thinking: {
    name: "Complex Thinking", content: ["None or one of the subcompetencies is developed", "Two or three of the subcompetencies are developed.", "The four sub-competencies are developed."], description: "Proposing solutions to complex problems involves using complex thinking competency, consisting of systemic thinking, scientific thinking, critical thinking, and innovative thinking. Only one sub-competency is developed at the Bounded level, while at the Full-cycle level, the four types of sub-competencies are developed integratively. The use of each type of thinking brings a dimension to the problem solution."
  }
}


const ProjectDetail = React.forwardRef((props, ref) => {
  return (
    <div className="overflow-x-auto overflow-visible">
      <table className="maturityTable border-solid border-base-content border border-collapse text-sm overflow-visible">
        <thead>
          <tr className="leading-8">
            <th className="bg-[#787878] border border-base-content p-2"><p className="text-right">Dimensions</p><p className="text-left">Components</p></th>
            {dimensions.map(dimension => {
              return <th className="bg-[#787878] border border-base-content p-2" key={dimension}>{dimension[0]}<br />{dimension[1]}</th>
            })}
            {/* <th className="border">Score</th> */}
          </tr>
        </thead>
        <tbody>
          {Object.keys(components).map(component => {
            let name = components[component].name
            let description = components[component].description
            let content = components[component].content
            let projectDimention = props.project[component] || 0
            let i = 1
            return <tr key={component}>
              <td className="bg-[#787878] border border-base-content p-2" >
                {name}
                <div class="dropdown dropdown-right dropdown-end dropdown-hover">
                  <label tabindex="0" class="btn btn-circle btn-ghost btn-xs text-base-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </label>
                  <div tabindex="0" class="card compact dropdown-content shadow bg-base-100 rounded-box w-80 lg:w-[36rem]">
                    <div class="card-body">
                      <h2 class="card-title">{name}</h2>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </td>
              {content.map(e => {
                if (props.editing)
                  return projectDimention === i ? 
                    <td key={component + i++} className="cursor-pointer bg-primary text-black border border-base-content p-2" onClick={() => props.updateComponent(component, content.indexOf(e)-1)}>{e}</td>:
                    <td key={component + i++} className="cursor-pointer hover:bg-[#333333] border border-base-content p-2" onClick={() => props.updateComponent(component, content.indexOf(e)+1)}>{e}</td>
                else
                  return projectDimention === i ? <td key={component + i++} className="bg-green-500 text-black border border-base-content">{e}</td> : <td key={component + i++} className="border border-base-content">{e}</td>
              })}
            </tr>
          })
          }
          {/* {components.map((e) => {
            return <tr key={e}>
              <td className="border">{e}</td><td className="border">{props.project[e] || 0}</td>
            </tr>
          })} */}
        </tbody>
      </table>
    </div>
  )
});

export default ProjectDetail;
