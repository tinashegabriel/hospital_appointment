from fastapi import Depends, FastAPI, HTTPException, Body
from fastapi.security import HTTPBearer
from hospital_app.models.schema import *
from hospital_app.utils.constants import *
import jwt
from hospital_app.utils.patients import *
from datetime import datetime, timedelta

app = FastAPI(
    title="HospitalAppointmentAPI",
    description="Hospital Appointment API is a REST API that is used to interact with hospital appointment database to create and manage entries",
    version="1.0.0-dev",
    terms_of_service="https://gpimbs.co.zw",
    contact={
        "name": "Leo & Ruvimbo The Developers",
        "url": "http://gpimbs.co.zw",
        "email": "developer@gpimbs.co.zw",
    },
)


http_scheme = HTTPBearer()

@app.get("/auth/refresh_roken", tags=["auth"])
async def auth_refresh(jwt_token = Depends(http_scheme)):
    
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        
        expires = (datetime.now() + timedelta(hours=24)).timestamp()
       
        new_token = jwt.encode({"emailAddress": str(jwt_token['emailAddress']), "exp": expires}, SECRET, algorithm="HS256")

        return MessageResponsePayloadItem(message = 'Success', payload = {"token": new_token, "expires": expires}, code = 200)
        
    except jwt.exceptions.InvalidSignatureError:
        
        raise HTTPException(status_code=403, detail="Not Valid")

    except Exception as e:

        raise HTTPException(500, detail=f"{e}")

@app.post("/auth/register", responses={
    200: {"message": "Account was created successfully", "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
}, tags=["auth"])
async def auth_register(patientDto: PatientDto = Body(...)):
    print("1")
    print(patientDto)
    
    try:
        firstName = patientDto.FirstName

        lastName = patientDto.LastName
 
        emailAddress = patientDto.EmailAddress

        password = patientDto.Password

        req = create_patient(firstName,lastName,emailAddress,password)

        match req.code:
            case 200:
                return MessageResponseItem(message = 'Account was created successfully', code = 200)
            
            case 400:
                return MessageResponseItem(message = req.message, code = 400)
            
            case 405:
                return MessageResponseItem(message = req.message, code = 405)

            case _:
                return MessageResponseItem(message = 'Unknown Error', code = 500)

    except Exception as e:
        raise HTTPException(500, detail=f"{e}")

@app.post("/auth/login", tags=["auth"])
async def auth_login(loginDto: LoginDto = Body(...)):
    try:
        emailAddress = loginDto.username

        password = loginDto.password
        
        req = login_patient(emailAddress,password)

        print(req)

        match req.code:
            case 200:
                result = hashlib.md5(password.encode())
                if req.payload["result"][0]["password"] == result.hexdigest():
                    expires = (datetime.now() + timedelta(hours=24)).timestamp()
                    jwt_token = jwt.encode({"emailAddress": str(emailAddress), "exp": expires}, SECRET, algorithm="HS256")

                
                    return MessageResponsePayloadItem(message = 'Success', payload = {"token": jwt_token, 
                                                                                      "expires": expires,
                                                                                      }, code = 200)
                
                elif req.payload["result"][0]["password"] != loginDto.password:

                    return MessageResponseItem(code=400, message="Wrong username or password")

            case 203:
                return MessageResponseItem(code=400, message="Wrong username or password")
        
            case 400:
                return MessageResponseItem(code=405, message="User not found")

            case _:
                return MessageResponseItem(code=500, message="Unknown error")
    
    except Exception as e:
        traceback.print_exc()
    
        raise HTTPException(status_code=500, detail=f"{e}")

# @app.post("/auth/verify", tags=["auth"])
# async def auth_verify(verificationDto: VerificationDto = Body(...)):
    
#     try:
#         phone = verificationDto.phonenumber
#         req = verify_odoo_user(base_url, phone, verificationDto.pin, cgrates_url)
        
#         match req.code:
#             case 200:
#                 dev_msg = ""
#                 if verificationDto.mac != None:
            
#                     dev_msg = save_device(base_url, phone, verificationDto.mac, cgrates_url).message
                
#                 expires = (datetime.now() + timedelta(hours=24)).timestamp()
#                 jwt_token = jwt.encode({"phonenumber": str(phone), "exp": expires}, SECRET, algorithm="HS256")

#                 return MessageResponsePayloadItem(message = 'Success', payload={
#                     "token": jwt_token,
#                     "expires": expires,
#                     "dev_msg": "No device added" if dev_msg == "" else dev_msg
#                 }, code = 200)

#             case 201:
#                 expires = (datetime.now() + timedelta(hours=24)).timestamp()
#                 jwt_token = jwt.encode({"phonenumber": str(phone), "exp": expires}, SECRET, algorithm="HS256")

#                 return MessageResponsePayloadItem(message = 'Account already verified', payload={
#                     "token": jwt_token,
#                 },code = 201)

#             case 404:
#                 return MessageResponseItem(message = 'Invalid otp', code = 404)

#             case 400:
#                 return MessageResponseItem(message = 'Invalid pin', code = 400)

#             case _:
#                 return MessageResponseItem(message = 'Unknown Error', code = 500)

#     except Exception as e:

#         raise HTTPException(status_code=500, detail=f"{e}")

@app.get("/auth/forgot", tags=["auth"])
async def forgot_password(emailAddress: str):
    try:
        req  = resend_otp(base_url, emailAddress)

        match req.code:
            case 200:
                return MessageResponseItem(message = 'Success. Please check your mobile', code = 200)
            
            case 404:
                return MessageResponseItem(message = 'Account not found', code = 403)

            case _:
                return MessageResponseItem(message = 'Unknown error', code = 500)

    except Exception as e:

        raise HTTPException(status_code=500, detail=f"{e}")


@app.get("/patients", responses={
    200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["patient"])
async def get_patient(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        req = get_user_info(emailAddress)

        match req.code:
            case 200:
                return MessageResponsePayloadItem(message = 'Success',payload = req.payload, code = 200)
            
            case 404:
                return MessageResponseItem(code=405, message="User not found")

            case _:
                return MessageResponseItem(code=500, message="Unknown error")

    except jwt.exceptions.InvalidSignatureError:
        raise HTTPException(status_code=403, detail="Not Valid")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{e}")

@app.put("/patient", tags=["patient"])
async def update_patient(updatesUserDto: UpdatesPatientDto=Body(...), jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        phone = jwt_token['phonenumber']

        result = update_user_changes(base_url,phone,updatesUserDto.PhoneNumber,updatesUserDto.Gender,updatesUserDto.HomeAddress)

        return MessageResponseItem(message = result.message, code = result.code)

    except jwt.exceptions.InvalidSignatureError:
        raise HTTPException(status_code=403, detail="Not Valid")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{e}")

@app.put("/patients/pass", responses={
     200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["patient"])
async def change_pass(changePinDto: ChangePasswordDto = Body(...),jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])

        phone = jwt_token['phonenumber']

        new_pin  = changePinDto.new_pin
        old_pin = changePinDto.old_pin

        req = change_pass(base_url, phone,old_pin, new_pin, cgrates_url)
        match req.code:
            case 200:
                return MessageResponseItem(message = 'Success', code = 200)

            case 400:
                return MessageResponseItem(message = req.message, code = 400)
            
            case 404:
                return MessageResponseItem(message = 'Account not found', code = 404)

            case _:
                return MessageResponseItem(message = 'Unknown error', code = 500)

    except jwt.exceptions.InvalidSignatureError:
        
        raise HTTPException(status_code=403, detail="Not Valid")

    except Exception as e:

        raise HTTPException(status_code=500, detail=f"{e}")
    
    

