from collections import UserDict
from fastapi import FastAPI, Request, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from tortoise.contrib.fastapi import register_tortoise
from fastapi import FastAPI, File, UploadFile
from models import *
from authentication import *
from sendemail import *
from upload import *

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# When we create an instance of the OAuth2PasswordBearer class we pass in the tokenUrl parameter. 
# This parameter contains the URL that the client (the frontend running in the user's browser) will use to send the username and password in order to get a token.
# declares that the URL/token will be the one that the client should use to get the token.


@app.get("/")
async def root():
    return {"message": "helloworld"}

@app.post("/token")
async def generate_token(request_form: OAuth2PasswordRequestForm = Depends()):
    token = await token_generator(request_form.username, request_form.password)
    return {"access_token": token, "token_type": "bearer"}


async def get_current_user(token: str = Depends(oauth2_scheme)):
    #FastAPI will know that it can use this dependency to define a "security scheme" in the OpenAPI schema, depends object will 
    try:
        payload = jwt.decode(token, config["SECRET"],algorithms=["HS256"])
        user = await User.get(id = payload.get("id"))
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password, get_current_user",
            
            headers={"WWW-Authenticate": "Bearer"}
        )
    return await user #If it doesn't see an Authorization header, or the value doesn't have a Bearer token, it will respond with a 401 status code error (UNAUTHORIZED) directly.

@app.get("/users/me") 
async def user_login(user: UserIn_Pydantic = Depends(get_current_user)):
    return user


@app.get("/verification") #This is for verifying account through email
async def user_verify(token: str):
    try:
        user = await verify_token(token)
        
        user.is_verified=True
        await user.save()
    except Exception as e:
        return e
    return {"message": "{}, you have been {}verified".format(user.email, user.is_verified)}

@app.get("/debug")
async def get_user(e:str):
     
    user = await User.get(email=e) #start query
    
    
    return user.email

@app.post("/register")
async def user_register(user: UserIn_Pydantic):
    user_info = user.dict(exclude_unset=True) #user changed into dictionary format
    user_info["password"] = get_password_hash(user_info["password"]) #we create new password field and save hashed password in
    #exclude_unset: whether fields which were not explicitly set when creating the model should be excluded from the returned dictionary
    user_obj = await User.create(**user_info) #stores it in database table user
    new_user = await user_pydantic.from_tortoise_orm(user_obj)#convert userobj into pydantic model
    await simple_send(email=[new_user.email], instance=new_user)

    return {
        "{}, please check you email for verification link".format(new_user.username)
    }

@app.get("/showfiles")
async def showfiles():
    return showFiles()

    
@app.post("/uploadfile")
async def create_upload_file(file: UploadFile):
    name = file.filename
    type = file.content_type
    return await uploadtoazure(file,name,type)

#sets up Tortoise-ORM on startup and cleans up on teardown.
register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules ={"models":["models"]},
    generate_schemas=True,
    add_exception_handlers=True

)