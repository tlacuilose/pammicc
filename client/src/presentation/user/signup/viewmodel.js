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
    await authService.registerUser(values).catch( error => {
      setError(error);
      return;
    });

    const today = new Date()
    console.log(today)

    setCookie('refreshedCookies', today, { path: window.location.host } )

    navigate(`/`);
  }

  return {
    ...values,
    error,
    onChange,
    registerUser
  }

}

