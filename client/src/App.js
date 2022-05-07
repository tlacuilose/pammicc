import React from "react";
import { Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./presentation/application/contexts/auth-context";
import Navbar from "./presentation/application/components/navbar";
import ProjectList from "./presentation/project/list/view";
import ProjectNew from "./presentation/project/new/view";
import ProjectEdit from "./presentation/project/edit/view";
import LoginUser from "./presentation/user/login/view";
import SignupUser from "./presentation/user/signup/view";

const App = () => {
  return (
    <div className="bg-base-300">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ProjectList />} />
          <Route exact path="/new" element={<ProjectNew />} />
          <Route exact path="/edit/:id" element={<ProjectEdit />} />
          <Route exact path="/login" element={<LoginUser />} />
          <Route exact path="/signup" element={<SignupUser />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App;
