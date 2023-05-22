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
        "name": "Ruvimbo Bumhudza",
        "url": "http://gpimbs.co.zw",
        "email": "ruvimbobumhudza@gmail.com",
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


@app.get("/patient", responses={
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
        emailAddress = jwt_token['emailAddress']

        result = update_user_changes(emailAddress,updatesUserDto.PhoneNumber,updatesUserDto.Gender,updatesUserDto.HomeAddress)

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

        emailAddress = jwt_token['emailAddress']

        new_pin  = changePinDto.NewPassword
        old_pin = changePinDto.OldPassword

        req = change_pass(emailAddress,old_pin, new_pin, cgrates_url)
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
    

@app.get("/appointment", responses={
    200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["appointment"])
async def get_appointments(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        req = get_user_appointments(emailAddress)

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

@app.post("/appointment", tags=["appointment"])
async def book_appointment(appointmentDto: AppointmentDto=Body(...), jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        email = jwt_token['emailAddress']

        result = create_booking(email,appointmentDto.docIds,
                                    appointmentDto.FirstName, 
                                    appointmentDto.LastName, 
                                    appointmentDto.EmailAddress,
                                    appointmentDto.Phonenumber,
                                    appointmentDto.D_O_B, 
                                    appointmentDto.Address, 
                                    appointmentDto.City, 
                                    appointmentDto.Applied_before,
                                    appointmentDto.Procedure, 
                                    appointmentDto.Appointment_date,
                                    appointmentDto.Appointment_time,
                                    appointmentDto.Symptoms)

        return MessageResponseItem(message = result.message, code = result.code)

    except jwt.exceptions.InvalidSignatureError:
        raise HTTPException(status_code=403, detail="Not Valid")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{e}")

@app.put("/appointment", responses={
     200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["appointment"])
async def update_appointment(changePinDto: ChangePasswordDto = Body(...),jwt_token = Depends(http_scheme)):
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

@app.get("/doctors", responses={
    200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["doctors"])
async def get_doctors(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        req = get_user_doctors(emailAddress)

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

@app.get("/admin/refresh_roken", tags=["admin"])
async def admin_refresh(jwt_token = Depends(http_scheme)):
    
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        
        expires = (datetime.now() + timedelta(hours=24)).timestamp()
       
        new_token = jwt.encode({"emailAddress": str(jwt_token['emailAddress']), "exp": expires}, SECRET, algorithm="HS256")

        return MessageResponsePayloadItem(message = 'Success', payload = {"token": new_token, "expires": expires}, code = 200)
        
    except jwt.exceptions.InvalidSignatureError:
        
        raise HTTPException(status_code=403, detail="Not Valid")

    except Exception as e:

        raise HTTPException(500, detail=f"{e}")

@app.post("/admin/register", responses={
    200: {"message": "Account was created successfully", "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
}, tags=["admin"])
async def admin_register(patientDto: PatientDto = Body(...)):
    print("1")
    print(patientDto)
    
    try:
        firstName = patientDto.FirstName

        lastName = patientDto.LastName
 
        emailAddress = patientDto.EmailAddress

        password = patientDto.Password

        req = create_admin(firstName,lastName,emailAddress,password)

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


@app.post("/admin/login", tags=["admin"])
async def admin_login(loginDto: LoginDto = Body(...)):
    try:
        emailAddress = loginDto.username

        password = loginDto.password
        
        req = login_admins(emailAddress,password)

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
    
@app.get("/admin/appointments", tags=["admin"])
async def appointments(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        req = get_admin_appointments(emailAddress)

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
    
    except Exception as e:
        traceback.print_exc()
    
        raise HTTPException(status_code=500, detail=f"{e}")

@app.post("/admin/appointment", tags=["admin"])
async def book_appointment(appointmentDto: AdminAppointmentDto=Body(...), jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        email = jwt_token['emailAddress']

        result = create_booking_admin(email,
                                    appointmentDto.userIds,
                                    appointmentDto.docIds,
                                    appointmentDto.EmailAddress,
                                    appointmentDto.Phonenumber,
                                    appointmentDto.D_O_B, 
                                    appointmentDto.Address, 
                                    appointmentDto.City, 
                                    appointmentDto.Applied_before,
                                    appointmentDto.Procedure, 
                                    appointmentDto.Appointment_date,
                                    appointmentDto.Appointment_time,
                                    appointmentDto.Symptoms)

        return MessageResponseItem(message = result.message, code = result.code)

    except jwt.exceptions.InvalidSignatureError:
        raise HTTPException(status_code=403, detail="Not Valid")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{e}")

@app.get("/admin/doctors", tags=["admin"])
async def doctors(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        req = get_admin_doctors(emailAddress)

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

@app.get("/admin/patients", tags=["admin"])
async def patients(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        req = get_admin_patients(emailAddress)

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

@app.post("/doctor/login", tags=["admin"])
async def _login(loginDto: LoginDto = Body(...)):
    try:
        emailAddress = loginDto.username

        password = loginDto.password
        
        req = login_doctors(emailAddress,password)

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

@app.get("/doctor", responses={
    200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["admin"])
async def get_doctor(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        req = get_user_appointments(emailAddress)

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


@app.post("/doctor", tags=["admin"])
async def create_doctor(doctorDto: DoctorDto=Body(...), jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        email = jwt_token['emailAddress']
        first_name = doctorDto.FirstName
        last_name = doctorDto.LastName
        gender = doctorDto.Gender
        phone_number = doctorDto.PhoneNumber
        email_address = doctorDto.EmailAddress
        home_address = doctorDto.HomeAddress
        doc_type = doctorDto.Type
        password = doctorDto.Password

        result = add_doctor(first_name, last_name, gender, phone_number, email_address, home_address,doc_type,password)

        return MessageResponseItem(message = result.message, code = result.code)

    except jwt.exceptions.InvalidSignatureError:
        raise HTTPException(status_code=403, detail="Not Valid")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{e}")

@app.put("/doctor", responses={
     200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["admin"])
async def update_doctor(changePinDto: ChangePasswordDto = Body(...),jwt_token = Depends(http_scheme)):
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

@app.get("/doctor/appointments", responses={
    200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["admin"])
async def get_doctor_appointments(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        print(f"Email yasvika iyi {emailAddress}")
        req = get_doc_appointments(emailAddress)

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

@app.get("/doctor/calender", responses={
    200: {"message": "Success", "data": {'phone': '1234'}, "code": 200},
    500: {"model": HTTPError, "description": "Raise"}
},tags=["admin"])
async def get_doctor_calender(jwt_token = Depends(http_scheme)):
    try:
        jwt_token = jwt.decode(jwt_token.credentials, SECRET, algorithms=["HS256"])
        emailAddress = jwt_token['emailAddress']
        req = get_doc_calender(emailAddress)

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
    
    



