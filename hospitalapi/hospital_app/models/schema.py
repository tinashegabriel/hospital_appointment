from typing import Optional
from pydantic import BaseModel

class MessageResponsePayloadItem(BaseModel):
    message: str
    payload: dict
    code: int

class MessageResponseItem(BaseModel):
    message: str
    code: int

class MessageResponseDto(BaseModel):
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

class DoctorDto(BaseModel):
    FirstName: str
    LastName: str
    Gender: Optional[str]
    PhoneNumber: Optional[str]
    EmailAddress: str
    HomeAddress: Optional[str]
    Password: str

class AppointmentDto(BaseModel):
    FirstName: str
    LastName: str
    EmailAddress: str
    Phonenumber: str
    D_O_B: str
    Address: str
    City: str
    Applied_before: str
    Procedure: str
    Appointment_date: str
    Appointment_time: str
    Symptoms: str
    

