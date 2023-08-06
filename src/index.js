import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, BrowserRouter as Router, HashRouter } from "react-router-dom";
import { ContextProvider } from "./context";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>

);

