import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const repo = require("../../../data/repositories/projects-repository");

export default function EditProjectViewModel() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [ showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [values, setValues] = useState({
    name: "",
    description: "",
    url: "",
    tags: ""
  });
  const [ cookies ] = useCookies();

  function onChange(event) {
    setValues({...values, [event.target.name]: event.target.value});
  }

  async function getProjectInfo(id) {
    try {
      let project = await repo.getProject(id);
      setValues({...values,
        name: project.name,
        description: project.description,
        url: project.url,
        tags: project.tags
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
    updateProject,
    getProjectInfo,
    showConfirmDelete,
    askDelete,
    cancelDelete
  }

}

