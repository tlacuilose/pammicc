import { useState, useContext } from "react";
import { AuthContext } from "./../../application/contexts/auth-context";

export default function LoginUserViewModel() {
  const { error, login } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  function onChange(event) {
    setValues({...values, [event.target.name]: event.target.value});
  }

  async function loginUser() {
    await login(values);
  }

  return {
    ...values,
    error,
    onChange,
    loginUser
  }

}

