from typing import Optional
from pydantic import BaseModel

class MessageResponsePayloadItem(BaseModel):
    message: str
    payload: dict
    code: int

class MessageResponseItem(BaseModel):
    message: str
    code: int


class HTTPError(BaseModel):
    detail: str

    class Config:
        schema_extra = {
            "example": {"detail": "HTTPException raised."},
        }

class RefreshTokenDto(BaseModel):
    token: str


class LoginDto(BaseModel):
    username: str
    password: str

class ChangePasswordDto(BaseModel):
    OldPassword: str
    NewPassword: str

class UpdatesPatientDto(BaseModel):
    PhoneNumber: Optional[str]
    Gender: Optional[str]
    HomeAddress: Optional[str]


class PatientDto(BaseModel):
    FirstName: str
    LastName: str
    EmailAddress: str
    Password: str
