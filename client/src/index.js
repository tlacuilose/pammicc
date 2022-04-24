import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import './assets/main.css';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

