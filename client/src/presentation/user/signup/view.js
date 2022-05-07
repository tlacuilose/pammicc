import React, { useEffect } from "react";
import SignupUserViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";

export default function SignupUser() {
  const {registerUser, name, lastName, email, password, onChange, error} = SignupUserViewModel();

  return (
    <div className="md:container md:mx-auto p-2 min-h-[90vh]">
      {error &&
        <ErrorAlert message={error.message} />
      }
      <div className="hero-content flex-col lg:flex-row-reverse py-4 md:py-20 sm:px-32">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">The Pammic platform is an amazing resource for anyone looking to get involved in citizen science projects! The site provides a wealth of information on each project, detailing the maturity level of each project and what skills are needed to participate. This makes it easy for anyone to find a project that fits their needs and get started!</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                onChange={onChange}
                value={name}
                name="name"
               />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                onChange={onChange}
                value={lastName}
                name="lastName"
               />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered"
                onChange={onChange}
                value={email}
                name="email"
               />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                onChange={onChange}
                value={password}
                name="password"
              />
              {/*
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
              */}
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={registerUser}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

