import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Register } from "./components/Register";
import { Layout } from "./components/Layout";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/:groupId" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
