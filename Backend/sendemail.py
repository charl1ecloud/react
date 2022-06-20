# Don't use file names that have the same name as Python standard library modules. 
from fastapi import BackgroundTasks, UploadFile, File, Form, Depends, HTTPException,status
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from dotenv import dotenv_values
from jwt import PyJWT
from pydantic import BaseModel,EmailStr
from typing import List
import jwt
from starlette.responses import JSONResponse
from starlette.requests import Request
from models import *

config = dotenv_values(".env")

conf = ConnectionConfig(
    MAIL_USERNAME = "jackma2333@gmail.com",
    MAIL_PASSWORD = "vunsldjtckdkpxrb",
    MAIL_FROM = "jackma2333@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="Desired Name",
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)





async def simple_send(email: List, instance: User):

    
    
    token_data = {
        "id" : instance.id,
        "username": instance.username
    }
    token = jwt.encode(token_data, config["SECRET"], algorithm='HS256')
    html = """
<p>Thanks for using Fastapi-mail</p> 
<a href="http://localhost:8000/verification/?token={}">verify your email</a>
""".format(token) #?variable = {} is a path variable in which is specified in main.py
    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=email,  # List of recipients, as many as you can pass 
        body=html,
        subtype="html"
        )
    fm = FastMail(conf)
    await fm.send_message(message)
    return {"status_code": 200, "message": "email has been sent"}