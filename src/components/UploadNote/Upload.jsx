import React from "react";
import "./Upload.css";

export default function Upload() {
  return (
    <div className="uploader-holder">
      <div className="uploader">
        <i className="fa-solid fa-file-lines"></i>
        <label className="upload-button" id="select_button">Upload File
        <input type="file" id="file-input" multiple style={{display: 'none'}}></input></label>
         {/* a label which act as a button, change it when needed */}
        <div className="help-text">Or drag your file in</div>
        <div className="uploader-footer">Accepts formats: .docx .pdf</div>
      </div>
    </div>
  );
}
