import { useState } from "react";
import { useNavigate } from "react-router-dom";
const repo = require("../../../data/repositories/projects-repository");

export default function NewProjectViewModel() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: ""
  });

  function onChange(event) {
    setValues({...values, [event.target.name]: event.target.value});
  }

  async function saveProject() {
    const error = await repo.addNewProject(values);
    if (error) {
      setError(error);
    } else {
      navigate(`/`);
    }
  }

  return {
    ...values,
    error,
    onChange,
    saveProject
  }

}
