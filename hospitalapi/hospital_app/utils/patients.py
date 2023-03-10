
import hashlib
import json
import requests
import traceback
from datetime import datetime, timedelta
from random import randint
from hospital_app.models.schema import MessageResponseItem, MessageResponsePayloadItem
from hospital_app.utils.cgrates import *
from dateutil.relativedelta import relativedelta
import math
from hospital_app.utils.radius import radius_connection, ras_details
from .constants import odoo_user, odoo_password, tenant, sms_url
import pytz

import mysql.connector
from mysql.connector import Error

def connect():
    """ Connect to MySQL database """
    conn = None
    try:
        conn = mysql.connector.connect(host='127.0.0.1',
                                       database='hospital_appointment',
                                       user='root',
                                       password='')
        if conn.is_connected():
        
            print('Connected to MySQL database')
            return conn
        else:
            return conn

    except Error as e:
        print(e)

    # finally:
    #     if conn is not None and conn.is_connected():
    #         conn.close()



def create_patient(firstName,lastName,emailAddress,password):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")
            sql = "INSERT INTO patients (first_name, last_name, email_address) VALUES (%s, %s, %s)"

            val = (firstName,lastName,emailAddress)

            mycursor.execute(sql, val)

            db.commit()

            print(mycursor.rowcount, "record inserted.")

            print(mycursor.lastrowid)

            last_id = mycursor.lastrowid
            if last_id >0:
 
                result = hashlib.md5(password.encode())

                sql = "INSERT INTO credentials (user_id, password) VALUES (%s, %s)"

                val = (last_id, result.hexdigest())

                mycursor.execute(sql, val)

                db.commit()

                print(mycursor.rowcount, "record inserted.")

                db.close()

                return MessageResponseItem(code=200, message="Account was created successfully")
            else:
                return MessageResponseItem(code=400, message="Failed to create an account")

        return MessageResponseItem(code=405, message="Failed to connect !!!")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()

def login_patient(emailAddress,password):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")
            result = hashlib.md5(password.encode())

            sql = "SELECT email_address, password FROM patients JOIN credentials ON patients.id = credentials.user_id WHERE email_address = %s AND password = %s"

            val = (emailAddress,result.hexdigest())

            mycursor.execute(sql, val)

            myresult = mycursor.fetchall()

            print(myresult)

            db.close()

            data = []
            if not myresult:
                return MessageResponseItem(code=203, message="Account does not exists")
            else:
                for x in myresult:
                    print(x[1])
                    result_list = {
                        "emailAddress": x[0],
                        "password": x[1]
                    }

                    data.append(result_list)

                return MessageResponsePayloadItem(code=200, message="User logged in successfully", payload={
                "result": data
                })


        return MessageResponseItem(code=400, message="Account already exists")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()

def get_user_info(emailAddress):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")

            sql = "SELECT * FROM patients WHERE email_address = %s "

            val = (emailAddress,)

            mycursor.execute(sql, val)

            myresult = mycursor.fetchall()

            print(myresult)

            db.close()

            data = []
            if not myresult:
                return MessageResponseItem(code=203, message="Account does not exists")
            else:
                for x in myresult:
                    print(x[1])
                    result_list = {
                        "firstName": x[1],
                        "lastName": x[2],
                        "gender": x[3],
                        "phoneNumber": x[4],
                        "emailAddress": x[5],
                        "homeAddress": x[6]
                    }

                    data.append(result_list)

                return MessageResponsePayloadItem(code=200, message="User logged in successfully", payload={
                "result": data
                })


        return MessageResponseItem(code=400, message="Account already exists")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()

def create_booking(email,firstName,lastName,emailAddress,phone,D_O_B,address,city,applied_before,procedure, appointment_date,appointment_time,symptoms):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")
            mySql = "SELECT * FROM patients WHERE email_address = %s"

            values = (email,)

            mycursor.execute(mySql,values)

            record = mycursor.fetchone()

            print(record[0])

            if not record:
                return MessageResponseItem(code=203, message="Account does not exists")
            
            else:

                sql = "INSERT INTO appointments (user_id,first_name, last_name, date_of_birth, email_address, phone_number, home_address, city, applied_bofore, appointment_procedure, appointment_date, appointment_time, symptoms) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

                val = (record[0],firstName,lastName,D_O_B,emailAddress,phone,address,city,applied_before,procedure,appointment_date,appointment_time,symptoms)

                mycursor.execute(sql, val)

                db.commit()

                print(mycursor.rowcount, "record inserted.")

                print(mycursor.lastrowid)

                last_id = mycursor.lastrowid
                if last_id >0:

                    db.close()

                    return MessageResponseItem(code=200, message="Appointment was created successfully")
                else:
                    return MessageResponseItem(code=400, message="Failed to create an account")

        return MessageResponseItem(code=405, message="Failed to connect !!!")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()

def get_user_appointments(emailAddress):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")

            sql = "SELECT * FROM patients WHERE email_address = %s "

            val = (emailAddress,)

            mycursor.execute(sql, val)

            myresult = mycursor.fetchone()

            

            data = []
            if not myresult:
                return MessageResponseItem(code=203, message="Account does not exists")
            else:
                print(myresult[0])

                sql = "SELECT * FROM appointments WHERE user_id = %s "

                user_id= myresult[0]

                val = (user_id,)

                mycursor.execute(sql, val)

                records = mycursor.fetchall()

                db.close()

                for record in records:
                    
                    result_list = {
                            "first_name": record[3],
                            "last_name": record[4],
                            "date_of_birth": record[5],
                            "email_address": record[6],
                            "phone_number": record[7],
                            "address": record[8],
                            "city": record[9],
                            "applied_before": record[10],
                            "procedure": record[11],
                            "appointment_date": record[12],
                            "appointment_time": record[13],
                            "symptoms": record[14]
                            }

                    data.append(result_list)

                print(data)

                return MessageResponsePayloadItem(code=200, message="User logged in successfully", payload={
                "result": data
                })


        return MessageResponseItem(code=400, message="Account already exists")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()

def create_admin(firstName,lastName,emailAddress,password):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")
            sql = "INSERT INTO admin (first_name, last_name) VALUES (%s, %s)"

            val = (firstName,lastName)

            mycursor.execute(sql, val)

            db.commit()

            print(mycursor.rowcount, "record inserted.")

            print(mycursor.lastrowid)

            last_id = mycursor.lastrowid
            if last_id >0:
 
                result = hashlib.md5(password.encode())

                sql = "INSERT INTO ad_credentials (admin_id,email_address, password) VALUES (%s, %s, %s)"

                val = (last_id, emailAddress, result.hexdigest())

                mycursor.execute(sql, val)

                db.commit()

                print(mycursor.rowcount, "record inserted.")

                db.close()

                return MessageResponseItem(code=200, message="Account was created successfully")
            else:
                return MessageResponseItem(code=400, message="Failed to create an account")

        return MessageResponseItem(code=405, message="Failed to connect !!!")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()

def add_doctor(first_name, last_name, gender, phone_number, email_address, home_address,password):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")
            sql = "INSERT INTO doctors (first_name, last_name, gender, phone_number, home_address) VALUES (%s, %s, %s, %s, %s)"

            val = (first_name, last_name, gender, phone_number, home_address)

            mycursor.execute(sql, val)

            db.commit()

            print(mycursor.rowcount, "record inserted.")

            print(mycursor.lastrowid)

            last_id = mycursor.lastrowid
            if last_id >0:
 
                result = hashlib.md5(password.encode())

                sql = "INSERT INTO ad_credentials (doctor_id, email_address, password) VALUES (%s, %s, %s)"

                val = (last_id, email_address, result.hexdigest())

                mycursor.execute(sql, val)

                db.commit()

                print(mycursor.rowcount, "record inserted.")

                db.close()

                return MessageResponseItem(code=200, message="Account was created successfully")
            else:
                return MessageResponseItem(code=400, message="Failed to create an account")

        return MessageResponseItem(code=405, message="Failed to connect !!!")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()

def login_admins(emailAddress,password):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")
            result = hashlib.md5(password.encode())

            sql = "SELECT ad_credentials.email_address, ad_credentials.password FROM admin JOIN ad_credentials ON admin.id = ad_credentials.admin_id WHERE ad_credentials.email_address = %s AND ad_credentials.password = %s"

            val = (emailAddress,result.hexdigest())

            mycursor.execute(sql, val)

            myresult = mycursor.fetchall()

            print(myresult)

            db.close()

            data = []
            if not myresult:
                return MessageResponseItem(code=203, message="Account does not exists")
            else:
                for x in myresult:
                    print(x[1])
                    result_list = {
                        "emailAddress": x[0],
                        "password": x[1]
                    }

                    data.append(result_list)

                return MessageResponsePayloadItem(code=200, message="User logged in successfully", payload={
                "result": data
                })


        return MessageResponseItem(code=400, message="Account already exists")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()

def login_doctors(emailAddress,password):
    db = None
    try:
        db = connect()

        print(db)

        if db != None:
            mycursor = db.cursor()
            print("1")
            result = hashlib.md5(password.encode())

            sql = "SELECT ad_credentials.email_address, ad_credentials.password FROM doctors JOIN ad_credentials ON doctors.id = ad_credentials.doctor_id WHERE ad_credentials.password = %s"

            val = (result.hexdigest(),)

            mycursor.execute(sql, val)

            myresult = mycursor.fetchall()

            print(myresult)

            db.close()

            data = []
            if not myresult:
                return MessageResponseItem(code=203, message="Account does not exists")
            else:
                for x in myresult:
                    print(x[1])
                    result_list = {
                        "emailAddress": x[0],
                        "password": x[1]
                    }

                    data.append(result_list)

                return MessageResponsePayloadItem(code=200, message="User logged in successfully", payload={
                "result": data
                })


        return MessageResponseItem(code=400, message="Account already exists")
            
    except Exception as e:
        traceback.print_exc()
        raise Exception(f"Exception: (create_patient) -> {e}")
    finally:
        if db is not None and db.is_connected():
            db.close()