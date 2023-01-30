import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { NavBar } from "./components/NavBar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UpdateGpu } from "./components/gpu/UpdateGpu";
import { AddGpu } from "./components/gpu/AddGpu";
import { GpuVideoCards } from "./components/gpu/GpuVideoCards";
import { BrandVideoCards } from "./components/brand/BrandVideoCards";
import { UpdateBrand } from "./components/brand/UpdateBrand";
import { AddBrand } from "./components/brand/AddBrand";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gpus/:id/videocards" element={<GpuVideoCards />} />
        <Route path="/brands/:id/videocards" element={<BrandVideoCards />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
