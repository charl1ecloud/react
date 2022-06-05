import NavBar from "./components/Navbar/NavBar";
import Home from "./Home";
import './app.css'
import {Routes, Route} from "react-router-dom";
import React from "react";
import Upload from "./components/UploadNote/Upload";
import Signup from "./components/Signup/Signup";
import AuthProvider from "./contexts/AuthContext";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/result" element={<Home />} />
        <Route path="/UploadNote" element={<Upload />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      </AuthProvider>
      
    </React.Fragment>
  );
}

export default App;
