import NavBar from "./components/Navbar/NavBar";
import Home from "./Home";
import './app.css'
import {Routes, Route} from "react-router-dom";
import React from "react";
import Upload from "./components/UploadNote/Upload";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/result" element={<Home />} />
        <Route path="/UploadNote" element={<Upload />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
