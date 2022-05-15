import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const repo = require("../../../data/repositories/projects-repository");

export default function EditProjectViewModel() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    url: "",
    tags: "",
    ctxt_awareness: 0,
    citzn_engmnt: 0,
    infstctr_lvrage: 0,
    tech_innovation: 0,
    ed_innovation: 0,
    outreach_scale: 0,
    ntwork_blding: 0,
    complex_thinking: 0
  });

  function onChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  
  function onChangeComponent(component, newValue) {
    setValues({ ...values, [component]: newValue })
  }

  async function saveProject() {
    try {
      const error = await repo.addNewProject(values);
      if (error) {
        setError(error);
      } else {
        navigate(`/`);
      }
    } catch {
      const error = new Error("Authentication issue.")
      setError(error)
    }
  }

  return {
    ...values,
    error,
    onChange,
    onChangeComponent,
    saveProject
  }

}
