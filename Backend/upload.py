from azure.storage.blob.aio import BlobServiceClient
from azure.storage.blob import ContentSettings, BlobClient, generate_blob_sas, BlobSasPermissions
from azure.storage.blob import BlobServiceClient as blobClient
from models import *
from fastapi import UploadFile
from datetime import datetime, timedelta


async def uploadtoazure(file: UploadFile,file_name: str,file_type:str):
    connect_str = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=notewebapp;AccountKey=Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg==;BlobEndpoint=https://notewebapp.blob.core.windows.net/;FileEndpoint=https://notewebapp.file.core.windows.net/;QueueEndpoint=https://notewebapp.queue.core.windows.net/;TableEndpoint=https://notewebapp.table.core.windows.net/"
    container_name = "notes"
    # print("Azure Blob Storage v" + __version__ + " - Python quickstart sample")
    my_content_settings = ContentSettings(content_type=file_type)
    # Create the BlobServiceClient object which will be used to create a container client
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    # Create a unique name for the container
    async with blob_service_client:
            container_client = blob_service_client.get_container_client(container_name)
            try:
                blob_client = container_client.get_blob_client(file_name)
                f = await file.read()
                await blob_client.upload_blob(f,content_settings=my_content_settings)
            except Exception as e:
                print(e)
                return "Something went terribly wrong.."
    
    return file_name

def showFiles():
    connect_str = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=notewebapp;AccountKey=Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg==;BlobEndpoint=https://notewebapp.blob.core.windows.net/;FileEndpoint=https://notewebapp.file.core.windows.net/;QueueEndpoint=https://notewebapp.queue.core.windows.net/;TableEndpoint=https://notewebapp.table.core.windows.net/"
    container_name = "notes"
    blob_service_client = blobClient.from_connection_string(connect_str)
    

    returnList = []
    
    container_client = blob_service_client.get_container_client(container_name)
    
    for blob in container_client.list_blobs():
           returnList.append(blob.name)
           
        
    return returnList

def download(n):
    connect_str = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=notewebapp;AccountKey=Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg==;BlobEndpoint=https://notewebapp.blob.core.windows.net/;FileEndpoint=https://notewebapp.file.core.windows.net/;QueueEndpoint=https://notewebapp.queue.core.windows.net/;TableEndpoint=https://notewebapp.table.core.windows.net/"
    container_name = "notes"
    blob_service_client = blobClient.from_connection_string(connect_str)
    key = "Aonb9v5frCwz9LME/7MzdTdOWjwNZ+8tWl2QE90zkYkddxY7N7dFyacGWhphMVRJh7KpXziwOsQK+ASt/7dbUg=="

    blob_client = blob_service_client.get_container_client(container= container_name) 
    sas_blob = generate_blob_sas(account_name="notewebapp", 
                                container_name=container_name,
                                blob_name=n,
                                account_key=key,
                                permission=BlobSasPermissions(read=True),
                                expiry=datetime.utcnow() + timedelta(hours=1))
    url = 'https://'+"notewebapp"+'.blob.core.windows.net/'+container_name+'/'+n+'?'+sas_blob
    return url

    


    

   
