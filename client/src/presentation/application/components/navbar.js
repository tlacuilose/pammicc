import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../contexts/auth-context";

export default function Navbar() {
  const { authUser, logout } = useContext(AuthContext);

  let navigate = useNavigate();

  return (
    <div>
      <div className="md:container md:mx-auto p-2">
        <div className="navbar bg-base-100 rounded-lg drop-shadow-md">
          <div className="navbar-start">
            <button className="btn btn-ghost normal-case text-xl" onClick={() => navigate(`/`)}>Pammicc</button>
            <div className="hidden md:flex">
              <ul className="menu menu-horizontal p-0 pl-2">
                <li><button onClick={() => navigate(`/`)}>Catalog</button></li>
              </ul>
              <ul className="menu menu-horizontal p-0 pl-2">
                { authUser && <li><button className="btn btn-link text-primary" onClick={() => navigate(`/new`)}>Add Project</button></li>}
              </ul>
            </div>
          </div>
          {authUser ? (
            <div className="navbar-end">
              <div className="lg:flex">
                <ul className="menu menu-horizontal p-0 pl-2">
                  {authUser && <li><h3>{authUser.name}</h3></li>}
                </ul>
              </div>
              <button className = "btn btn-primary ml-2" onClick={logout}>Logout</button>
            </div>
          ):(
            <div className="navbar-end">
              <div className="lg:flex">
                <ul className="menu menu-horizontal p-0 pl-2">
                  <li><button onClick={() => navigate(`/login`)}>Login</button></li>
                </ul>
              </div>
              <button className = "btn btn-primary ml-2" onClick={() => navigate(`/signup`)}>Sign up</button>
            </div>
          )}
        </div>
      </div>
      <div className="md:container md:mx-auto p-2 md:hidden">
        <div className="flex">
          <div className="mx-auto">
            <button onClick={() => navigate(`/`)}>Catalog</button>
            { authUser && <button className="btn btn-link ml-2" onClick={() => navigate(`/new`)}>Add Project</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
