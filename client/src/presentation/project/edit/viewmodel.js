import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const repo = require("../../../data/repositories/projects-repository");

export default function EditProjectViewModel() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
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
  const [cookies] = useCookies();

  function onChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function onChangeComponent(component, newValue) {
    setValues({ ...values, [component]: newValue })
  }

  async function getProjectInfo(id) {
    try {
      let project = await repo.getProject(id);
      setValues({
        ...values,
        name: project.name,
        description: project.description,
        url: project.url,
        tags: project.tags,
        ctxt_awareness: project.ctxt_awareness,
        citzn_engmnt: project.citzn_engmnt,
        infstctr_lvrage: project.infstctr_lvrage,
        tech_innovation: project.tech_innovation,
        ed_innovation: project.ed_innovation,
        outreach_scale: project.outreach_scale,
        ntwork_blding: project.ntwork_blding,
        complex_thinking: project.complex_thinking,
      });
    } catch (error) {
      setError(error)
    }
  }

  async function updateProject(id) {
    try {
      const error = await repo.updateProject(values, id);
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

  async function askDelete() {
    setShowConfirmDelete(true)
  }

  async function cancelDelete() {
    setShowConfirmDelete(false)
  }

  return {
    ...values,
    error,
    setError,
    onChange,
    onChangeComponent,
    updateProject,
    getProjectInfo,
    showConfirmDelete,
    askDelete,
    cancelDelete
  }

}

