import { useState, useContext } from "react";
import { AuthContext } from "./../../application/contexts/auth-context";

export default function SignupUserViewModel() {
  const { error, register } = useContext(AuthContext);
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
    await register(values);
  }

  return {
    ...values,
    error,
    onChange,
    registerUser
  }

}

