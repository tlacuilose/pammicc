import React, { useEffect } from "react";
import LoginUserViewModel from "./viewmodel";
import ErrorAlert from "../../application/components/error-alert";

export default function LoginUser() {
  const {loginUser, email, password, onChange, error} = LoginUserViewModel();

  return (
    <div class="md:container md:mx-auto p-2">
      {error &&
        <ErrorAlert message={error.message} />
      }
      <div class="hero-content flex-col lg:flex-row-reverse py-24 sm:px-24">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login now!</h1>
          <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                class="input input-bordered"
                onChange={onChange}
                value={email}
                name="email"
               />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                class="input input-bordered"
                onChange={onChange}
                value={password}
                name="password"
              />
              {/*
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
              </label>
              */}
            </div>
            <div class="form-control mt-6">
              <button
                class="btn btn-primary"
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
