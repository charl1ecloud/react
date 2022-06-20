import React from "react";
import "./Upload.css";
import { Button } from 'react-bootstrap'
import axios from "axios";
import { useRef, useState } from "react";

export default function Upload() {
  const hiddenFileInput = React.useRef(null)
  const [file, uploadFile] = useState(null)

 

  function handleSubmit(){
    console.log(file[0].name)
    const formdata = new FormData();
    formdata.append(
      "file",
      file[0],
      
      
    )

    axios.post("/uploadfile", {
      "file":formdata}, {
        "Content-Type": "multipart/form-data",
      })
          .then(function (response) {
            console.log(response); //"dear user, please check etc..."
          });
      
  }

  function handleChange(e){
    uploadFile(e.target.files);
  }

    

  return (
    <div className="uploader-holder">
      <div className="uploader">
        <i className="fa-solid fa-file-lines"></i>
        <Button className="upload-button" id="select_button" onClick={handleSubmit}>Upload File</Button>
        <input type="file" ref={hiddenFileInput} onChange={handleChange} id="file-input"></input>
        {/* a label which act as a button, change it when needed */}
        <div className="help-text">Or drag your file in</div>
        <div className="uploader-footer">Accepts formats: .docx .pdf</div>
      </div>
    </div>
  );
}
