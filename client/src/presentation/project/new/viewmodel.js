import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const repo = require("../../../data/repositories/projects-repository");

export default function NewProjectViewModel() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    url: "",
    tags: ""
  });
  const [ cookies, setCookie ] = useCookies();

  function onChange(event) {
    setValues({...values, [event.target.name]: event.target.value});
  }

  async function saveProject() {
    try {
      const userid = cookies.session._id
      const error = await repo.addNewProject(values, userid);
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
