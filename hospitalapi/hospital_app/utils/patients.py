
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

