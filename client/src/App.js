import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./presentation/application/components/navbar";
import ProjectList from "./presentation/project/list/view";
import ProjectNew from "./presentation/project/new/view";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ProjectList />} />
        <Route exact path="/new" element={<ProjectNew />} />
      </Routes>
    </div>
  )
}

export default App;
