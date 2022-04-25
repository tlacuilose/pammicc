import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

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
  const [ cookies, setCookie ] = useCookies()

  function onChange(event) {
    setValues({...values, [event.target.name]: event.target.value});
  }

  async function registerUser() {
    try {
      await authService.registerUser(values)

      const today = new Date()

      setCookie('refreshedCookies', today, { path: window.location.host } )

      navigate(`/`);
    } catch (error) {
      setError(error);
    }
  }

  return {
    ...values,
    error,
    onChange,
    registerUser
  }

}

