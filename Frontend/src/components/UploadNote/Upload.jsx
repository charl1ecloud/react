import React from "react";
import "./Upload.css";
import { Button } from 'react-bootstrap'
import axios from "axios";
import { useRef, useState,useEffect } from "react";
import {Alert} from "react-bootstrap"

export default function Upload() {
  const hiddenFileInput = React.useRef(null)
  const [file, uploadFile] = useState(null)
  const [submitted, updateSubmission] = useState(null)
  
 

  async function handleSubmit(){

    
    console.log(file[0].type)
    const formdata = new FormData();
    formdata.append(
      "file",
      file[0],
    )

    const headers={'Content-Type': file[0].type}
    
    await axios.post("/uploadfile",formdata, headers)
    .then(function (response) {
      const msg = "Your file "+ response.data +" has been uploaded"
      updateSubmission(msg); 
      console.log(response)
          });
      
  }

  function handleChange(e){
    uploadFile(e.target.files);
  }

  function handleUpload(){
    hiddenFileInput.current.click()
  }

    

  return (
    <>
    <div className="uploader-holder">
      <div className="uploader">
        <i className="fa-solid fa-file-lines"></i>
        <input className='center' type="file" ref={hiddenFileInput}  style={{display: "none"}} onChange={handleChange} id="file-input"></input>
        {file!=null && file[0].name}
        <Button className="select_button" id="select_button" onClick={handleUpload}>Select File</Button>
        <Button className="upload-button" id="upload_button" onClick={handleSubmit}>Upload File</Button>
        {/* a label which act as a button, change it when needed */}
        <div className="help-text">Or drag your file in</div>
        <div className="uploader-footer">Accepts formats: .docx .pdf</div>
        
        
      </div>
    </div>
    <br></br>
    <div id="alert" className='text-center mb-4'>
    {submitted != null && <Alert variant="info">{submitted}</Alert>}
    </div>
    </>
    
  );
}
