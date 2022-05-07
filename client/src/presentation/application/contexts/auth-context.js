import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const authService = require("../../../data/services/auth-service");

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function loadLocalAuthUser() {
    const savedId = localStorage.getItem("userid");
    const savedUser = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("useremail");
    if ((savedId === null || savedId === undefined ) || (savedUser === null || savedUser === undefined) || (savedEmail === null || savedEmail === undefined)) {
      setAuthUser(null)
    } else {
      setAuthUser({id: savedId, name: savedUser, email: savedEmail});
    }
  }

  function saveLocalAuthUser(id, name, email) {
      localStorage.setItem("userid", id);
      localStorage.setItem("username", name);
      localStorage.setItem("useremail", email)
      setAuthUser({id: id, name: name, email: email});
  }

  useEffect(() => {
    loadLocalAuthUser();
  }, [])

  async function login(values) {
    try {
      const response = await authService.loginUser(values);

      const json = await response.json();
      
      if (!json) {
        throw new Error("An error occured logging in.");
      }

      saveLocalAuthUser(json.id, json.name, json.email);
      navigate(`/`);
    } catch (error) {
      setError(error)
    }
  }

  async function register(values) {
    try {
      const response = await authService.registerUser(values);

      const json = await response.json();
      
      if (!json) {
        throw new Error("An error occured registering user.");
      }

      saveLocalAuthUser(json.id, json.name, json.email);
      navigate(`/`);
    } catch (error) {
      setError(error)
    }
  }

  async function logout() {
    try {
      await authService.logoutUser();

      localStorage.removeItem("username");
      localStorage.removeItem("useremail");

      setAuthUser(null);
      navigate(`/`);

    } catch (error) {
      setError(error);
    }
  }

  const  memoedValue = useMemo(
    () => ({
      authUser,
      error,
      login,
      register,
      logout
    }), [authUser, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

