// #!/usr/bin/env node

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { upload } from '@testing-library/user-event/dist/upload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//The code below this will be azure set up which will be not working right now
// require('dotenv').config();

const { BlobServiceClient } = require("@azure/storage-blob");
const blobSasUrl="https://notewebapp.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=co&sp=rwdlacupitfx&se=2022-06-10T06:27:44Z&st=2022-06-09T22:27:44Z&spr=https&sig=5iH3my6yBLfLHJk87D0GMx7TSoOp06w9PZAcm5MteFk%3D"
const storageAccountConnectionString = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=notewebapp;AccountKey=Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg==;BlobEndpoint=https://notewebapp.blob.core.windows.net/;FileEndpoint=https://notewebapp.file.core.windows.net/;QueueEndpoint=https://notewebapp.queue.core.windows.net/;TableEndpoint=https://notewebapp.table.core.windows.net/";
const blobServiceClient = new BlobServiceClient(blobSasUrl)
//
// const selectButton = document.getElementById("select-button")
// const fileInput = document.getElementById("file-input").files[0]

// selectButton.addEventListener("click", ()=> fileInput.click())
// fileInput.addEventListener("change", upload())

async function main() {
// Create a container (folder) if it does not exist
const containerName = 'notes';    
const containerClient = blobServiceClient.getContainerClient(containerName);
if ( !containerClient.exists()) {
    const createContainerResponse = await containerClient.createIfNotExists();
    console.log(`Create container ${containerName} successfully`, createContainerResponse.succeeded);
}
else {
    console.log(`Container ${containerName} already exists`);
}

// Upload the file
const filename = '/下载.png';
const blockBlobClient = containerClient.getBlockBlobClient(filename);
blockBlobClient.uploadFile(filename);

// Get a list of all the blobs in the container
let blobs = containerClient.listBlobsFlat();
let blob = await blobs.next();
while (!blob.done) {
    console.log(`${blob.value.name} --> Created: ${blob.value.properties.createdOn}   Size: ${blob.value.properties.contentLength}`);
    blob = await blobs.next();
}
}

// main()
