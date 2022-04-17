import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <div class="md:container md:mx-auto p-2">
      <div class="navbar bg-base-100 rounded-lg drop-shadow-md">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={() => navigate(`/`)}>Catalog</a></li>
            </ul>
          </div>
          <a class="btn btn-ghost normal-case text-xl" onClick={() => navigate(`/`)}>Pammicc</a>
          <div class="hidden lg:flex">
            <ul class="menu menu-horizontal p-0 pl-2">
              <li><a onClick={() => navigate(`/`)}>Catalog</a></li>
            </ul>
            <ul class="menu menu-horizontal p-0 pl-2">
              <li><a class="btn btn-link" onClick={() => navigate(`/new`)}>Add Project</a></li>
            </ul>
          </div>
        </div>
        <div class="navbar-end">
          <div class="hidden lg:flex">
            <ul class="menu menu-horizontal p-0 pl-2">
              <li><a onClick={() => navigate(`/login`)}>Login</a></li>
            </ul>
          </div>
          <a class = "btn btn-primary ml-2" onClick={() => navigate(`/signup`)}>Sign up</a>
        </div>
      </div>
    </div>
  );
}
