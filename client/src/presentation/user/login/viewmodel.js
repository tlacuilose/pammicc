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
    const response = await authService.loginUser(values).catch(error => {
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
    loginUser
  }

}

