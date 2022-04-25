import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const authService = require("../../../data/services/auth-service");

export default function Navbar() {
  const [ cookies, setCookie ] = useCookies();

  let navigate = useNavigate();

  async function logoutUser() {
    try {
      await authService.logoutUser()

      const today = new Date()
      setCookie('refreshedCookies', today, { path: window.location.host } )
    } catch (error) {
      return
    }
  }

  return (
    <div>
      <div class="md:container md:mx-auto p-2">
        <div class="navbar bg-base-100 rounded-lg drop-shadow-md">
          <div class="navbar-start">
            <button class="btn btn-ghost normal-case text-xl" onClick={() => navigate(`/`)}>Pammicc</button>
            <div class="hidden md:flex">
              <ul class="menu menu-horizontal p-0 pl-2">
                <li><button onClick={() => navigate(`/`)}>Catalog</button></li>
              </ul>
              <ul class="menu menu-horizontal p-0 pl-2">
                { cookies.jwt && <li><button class="btn btn-link text-primary" onClick={() => navigate(`/new`)}>Add Project</button></li>}
              </ul>
            </div>
          </div>
          {cookies.jwt ? (
            <div class="navbar-end">
              <div class="lg:flex">
                <ul class="menu menu-horizontal p-0 pl-2">
                  {cookies.session && <li><h3>{cookies.session.name}</h3></li>}
                </ul>
              </div>
              <button class = "btn btn-primary ml-2" onClick={logoutUser}>Logout</button>
            </div>
          ):(
            <div class="navbar-end">
              <div class="lg:flex">
                <ul class="menu menu-horizontal p-0 pl-2">
                  <li><button onClick={() => navigate(`/login`)}>Login</button></li>
                </ul>
              </div>
              <button class = "btn btn-primary ml-2" onClick={() => navigate(`/signup`)}>Sign up</button>
            </div>
          )}
        </div>
      </div>
      <div class="md:container md:mx-auto p-2 md:hidden">
        <div class="flex">
          <div class="mx-auto">
            <button onClick={() => navigate(`/`)}>Catalog</button>
            { cookies.jwt && <button class="btn btn-link ml-2" onClick={() => navigate(`/new`)}>Add Project</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
