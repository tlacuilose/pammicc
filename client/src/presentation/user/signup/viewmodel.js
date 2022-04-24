import { useState } from "react";
import { useNavigate } from "react-router-dom";
const authService = require("../../../data/services/auth-service");

export default function SignupUserViewModel() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: ""
  });

  function onChange(event) {
    setValues({...values, [event.target.name]: event.target.value});
  }

  async function registerUser() {
    const response = await authService.registerUser(values).catch( error => {
      setError(error);
    });

    const data = await response.json()
    console.log(data)
    console.log(data.token)
    navigate(`/`);
  }

  return {
    ...values,
    error,
    onChange,
    registerUser
  }

}

