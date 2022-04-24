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
    await authService.registerUser(values).catch( error => {
      setError(error);
    });

    navigate(`/`);
  }

  return {
    ...values,
    error,
    onChange,
    registerUser
  }

}

