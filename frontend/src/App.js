import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tables } from "./components/Tables";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UpdateGpu } from "./components/gpu/UpdateGpu";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Tables />
    </div>
  );
}

export default App;
