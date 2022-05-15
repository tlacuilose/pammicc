import React from "react";

const dimensions = [["BOUNDED CS", "(Baseline inputs)"], ["THRESHOLD CS", "(Transition outputs / outcomes)"], ["FULL-CYCLE CS", "(Fulfilment impact)"]]

const components = {
  ctxt_awareness: {
    name: "Context-awareness", content: ["Participation in or replication of an existing project", "Enhancement of an existing project", "Launch of an original topic project"]
  },
  citzn_engmnt: {
    name: "Citizen engagement", content: ["Passive; follows a leader", "Co-creates a proposal", "Leads a project"]
  },
  infstctr_lvrage: {
    name: "Infrastructure leverage", content: ["None or minimal interactions within available infrastructure", "Moderated interactions within available infrastructure", "Improves interactions within available infrastructure"]
  },
  tech_innovation: {
    name: "Technological innovation", content: ["Passive use of low-level technology", "Adaptation of technology", "Creation of technology and/or use of advanced technologies"]
  },
  ed_innovation: {
    name: "Educational innovation", content: ["Lack of educational focus", "Incremental use of educational resources", "Proposes reusable resources for formal / non - formal education"]
  },
  outreach_scale: {
    name: "Outreach and Scale", content: ["Number of participants: local Number of locations where data is collected: local", "Number of participants: national Number of locations where data is collected: national", "Number of participants: global Number of locations where data is collected: global"]
  },
  ntwork_blding: {
    name: "Network building", content: ["One or two helixes", "Three-helix interaction", "Four to five helix integration that concludes with Public Policies"]
  },
  complex_thinking: {
    name: "Complex Thinking", content: ["None or one of the subcompetencies is developed", "Two or three of the subcompetencies are developed.", "The four sub-competencies are developed."]
  }
}


const ProjectDetail = React.forwardRef((props, ref) => {
  return (
    <div>
      <table className="maturityTable border-solid border-white border border-collapse text-sm overflow-hidden">
        <thead>
          <tr className="leading-8">
            <th className="bg-[#787878] border"><p className="text-right">Dimensions</p><p className="text-left">Components</p></th>
            {dimensions.map(dimension => {
              return <th className="bg-[#787878] border" key={dimension}>{dimension[0]}<br />{dimension[1]}</th>
            })}
            {/* <th className="border">Score</th> */}
          </tr>
        </thead>
        <tbody>
          {Object.keys(components).map(component => {
            let name = components[component].name
            let content = components[component].content
            let projectDimention = props.project[component] || 0
            let i = 1
            return <tr key={component}>
              <td className="border" >{name}</td>
              {content.map(e => {
                if (props.editing)
                  return projectDimention === i ? 
                    <td key={component + i++} className="bg-green-500 text-black border">{e}</td>:
                    <td key={component + i++} className="hover:bg-[#333333] border" onClick={() => props.updateComponent(component, content.indexOf(e)+1)}>{e}</td>
                else
                  return projectDimention === i ? <td key={component + i++} className="bg-green-500 text-black border">{e}</td> : <td key={component + i++} className="border">{e}</td>
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
