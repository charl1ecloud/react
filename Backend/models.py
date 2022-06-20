from datetime import datetime
from tortoise import Model, fields
from pydantic import BaseModel
#pydantic enforces type hints at runtime, and provides user friendly errors when data is invalid.
from datetime import datetime
from tortoise.contrib.pydantic import pydantic_model_creator


class User(Model):
    id = fields.IntField(pk=True, index=True)
    username = fields.CharField(max_length=25,null=False,unique=True)
    email = fields.CharField(max_length=200,null=False,unique=True) #cannot have same email in databse, otherwise 400
    password =  fields.CharField(max_length=100, default = False,null=False)
    is_verified =  fields.BooleanField(default = False)
    join_date = fields.DatetimeField(default = datetime.utcnow)

    def __str__(self):
        return self.name
    def return_email(self):
        return email

# Function to build Pydantic Model off Tortoise Model.
user_pydantic = pydantic_model_creator(User, name="User", exclude=("is_verified",)) #user can only be verifed through email account
UserIn_Pydantic = pydantic_model_creator(User, name="UserIn", exclude_readonly=True, exclude=("is_verified","join_date"))#obtain user's data from frontend, doesn't need some data
user_pydanticOut = pydantic_model_creator(User, name="UserOut", exclude=("password",))#return response to user
#Exclude/_readonly： Extra fields to exclude from the provided model./Build a subset model that excludes any readonly fields