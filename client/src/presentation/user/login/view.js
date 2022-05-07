import React, { useEffect } from "react";
import LoginUserViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";

export default function LoginUser() {
  const {loginUser, email, password, onChange, error} = LoginUserViewModel();

  return (
    <div className="md:container md:mx-auto p-2 min-h-[80vh] sm:min-h-[90vh]">
      {error &&
        <ErrorAlert message={error.message} />
      }
      <div className="hero-content flex-col lg:flex-row-reverse py-8 md:py-24 sm:px-24">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Pammic is the perfect solution for citizen science projects! It's easy to use and helps to keep track of project maturity.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
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
                onClick={loginUser}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
