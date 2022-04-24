import { useState } from "react";
import { useNavigate } from "react-router-dom";
const authService = require("../../../data/services/auth-service");

export default function LoginUserViewModel() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  function onChange(event) {
    setValues({...values, [event.target.name]: event.target.value});
  }

  async function loginUser() {
    const error = await authService.loginUser(values);
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
    loginUser
  }

}

