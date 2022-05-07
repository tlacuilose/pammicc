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
    tags: ""
  });

  function onChange(event) {
    setValues({...values, [event.target.name]: event.target.value});
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
    saveProject
  }

}
