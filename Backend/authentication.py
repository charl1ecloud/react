# hash password
# PassLib is a great Python package to handle password hashes. It supports many secure hashing algorithms and utilities to work with them.
# The recommended algorithm is "Bcrypt".So, install PassLib with Bcrypt:

from pydoc import plain
from fastapi import (HTTPException, status)
import dotenv
from passlib.context import CryptContext
import jwt
from dotenv import dotenv_values
from models import *

config = dotenv_values(".env")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, config["SECRET"],algorithms=["HS256"]) #this payload has id and email I think
        user = User.get(id = payload.get("id")) #get user from database using their id
    except:
        raise HTTPException(status_code = status, detail = "invalid username or password")#if token is invalid to match any user
    
    return user

async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

async def authenticate_user(username, password):
    user = await User.get(username = username)
    if user and verify_password(password, user.password):
        return user
    return False


async def token_generator(username: str, password: str):
    user = await authenticate_user(username,password)
    if not user: #if user == False
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password, token_generator",
            headers={"WWW-Authenticate": "Bearer"}
        )
    token_data = {
        "id" : user.id,
        "username": user.username
    }

    token = jwt.encode(token_data, config["SECRET"])
    return token