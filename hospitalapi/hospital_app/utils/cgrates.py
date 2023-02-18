import string
import random
from datetime import datetime, timezone
import pytz
import requests
from dateutil.parser import parse
import traceback
import json

headers = {
    "Content-Type": "application/json"
}


def random_password(length=6):
    all = string.ascii_letters + string.digits

    return "".join(random.sample(all, length))


def add_month(date_object):

    month = date_object.month
    year = date_object.year
    if month == 12:
        month = 1
        year += 1
    else:
        month += 1
    date_object = datetime(year, month, 1, 0, 0, 0,
                           tzinfo=pytz.timezone('Africa/Harare'))

    return date_object.isoformat()


def set_balance(url, acc_name, tenant, balance, expiry_date, peak_id, timings=None):
    try:
        data = {
            "method": "APIerSv1.SetBalance",
            "params": [
                {
                    "Tenant": tenant,
                    "Account": acc_name,
                    "BalanceType": "*data",
                    "Value": balance,
                    "Balance": {
                        "ExpiryTime": expiry_date,
                        "ID": peak_id,
                        "RatingSubject": "*zero1024",
                        "Weight": 30,
                    },
                    "ActionExtraData": {
                        "AllowNegative": False,
                        "DenyNegativeAccount": True,
                        "Disabled": False
                    },
                    "Cdrlog": False
                }
            ]
        }

        headers = {
            'content-type': "application/json"
        }

        response = requests.post(url, json=data, headers=headers)

        return response.json()

    except:
        raise Exception('Failed to set balance')


def set_account(url, username, tenant):

    try:

        payload = {
            "method": "APIerSv2.SetAccount",
            "params": [
                {
                    "Tenant": tenant,
                    "Account": username,
                    "ExtraOptions": {
                        "AllowNegative": True,
                        "DenyNegativeAccount": False,
                        "Disabled": False
                    },
                    "ReloadScheduler": True
                }
            ]
        }

        headers = {
            'content-type': "application/json"
        }

        response = requests.post( url, json=payload, headers=headers)

        return response.json()

    except:

        raise Exception('Failed to set account')


def set_attributes(url, username, tenant, mac, pin):
    try:
        data = {
            "method": "APIerSv1.SetAttributeProfile",
            "params": [
                {
                    "Tenant": tenant,
                    "ID": f"ATTR_{mac}",
                    "Contexts": [
                        "*sessions"
                    ],
                    "FilterIDs":[
                        f"*string:~*req.Account:{username}"
                    ],
                    "ActivationInterval": None,
                    "Attributes": [
                        {
                            "FilterIDs": [],
                            "Path": "*req.Account",
                                    "Type": "*constant",
                                    "Value": [
                                        {
                                            "Rules": username
                                        }
                            ]
                        },
                        {
                            "FilterIDs": [],
                            "Path": "*req.Pin",
                                    "Type": "*constant",
                                    "Value": [
                                        {
                                            "Rules": pin
                                        }
                            ]
                        }
                    ],
                    "Blocker": False,
                    "Weight": 10
                }
            ]
        }

        headers = {
            'content-type': "application/json"
        }

        response = requests.post(url, json=data, headers=headers)

        return response.json()

    except Exception as e:

        raise Exception(f'Exception: {e}')


def set_device_attributes(url, username, tenant, mac, pin):
    try:

        data = {
            "method": "APIerSv1.SetAttributeProfile",
            "params": [
                {
                    "Tenant": tenant,
                    "ID": f"ATTR_{mac}",
                    "Contexts": [
                        "*sessions"
                    ],
                    "FilterIDs":[
                        f"*string:~*req.Account:{username}"
                    ],
                    "ActivationInterval":"None",
                    "Attributes":[
                        {
                            "FilterIDs": [

                            ],
                            "Path":"*req.Account",
                            "Type":"*constant",
                            "Value":[
                                {
                                    "Rules": username
                                }
                            ]
                        },
                        {
                            "FilterIDs": [

                            ],
                            "Path":"*req.Pin",
                            "Type":"*constant",
                            "Value":[
                                {
                                    "Rules": pin
                                }
                            ]
                        }
                    ],
                    "Blocker": False,
                    "Weight": 10
                }
            ]
        }

        y = json.dumps(data)

        headers = {
            'content-type': "application/json",
            'cache-control': "no-cache",
            'postman-token': "d05efad9-74df-0162-f14b-0a6465cdae74"
        }

        response = requests.post( url, data=y, headers=headers)

        return response.json()

    except:

        raise Exception('Failed to save attributes')


def delete_attributes(url, username, tenant):
    try:
        data = {
            "method": "APIerSv1.RemoveAttributeProfile",
            "params": [
                {
                    "Tenant": tenant,
                    "ID": f"ATTR_{username}"
                }
            ]
        }

        headers = {
            'content-type': "application/json",
            'cache-control': "no-cache"
        }

        response = requests.post( url, json=data, headers=headers)

        return response.json()

    except:
        raise Exception('Failed to delete attributes')


def de_activate_account(url, username, status, tenant):
    try:
        data = {
            "method": "APIerSv2.SetAccount",
            "params": [
                {
                    "Tenant": tenant,
                    "Account": username,
                    "ExtraOptions": {
                        "AllowNegative": True,
                        "DenyNegativeAccount": False,
                        "Disabled": status
                    },
                    "ReloadScheduler": True
                }
            ]
        }

        resp = requests.post(url, json=data, headers=headers)
        return resp.json()

    except:
        raise Exception('Failed to update account')


def get_active_sessions(url, tenant):
    try:
        data = {
            "method": "SessionSv1.GetActiveSessions",
            "params": [
                {
                    "Limit": None,
                    "Filters": [""],
                    "Tenant": tenant,
                    "APIOpts": {}
                }
            ]
        }

        resp = requests.post(url, json=data, headers=headers)
        return resp.json()

    except:
        raise Exception('Failed to update account')



def get_account(url, usernames, tenant):

    try:
        data = {
            "method": "APIerSv1.GetAccount",
            "params": [
                {
                    "Tenant": tenant,
                    "Account": usernames
                }
            ]
        }

        headers = {
            'content-type': "application/json",
        }

        response = requests.post(url, json=data, headers=headers)

        return response.json()

    except:
        raise Exception('Failed to update account')


def get_attributes(url, mac):
    try:
        data = {
            "method": "APIerSv1.GetAttributeProfile",
            "params": [
                {
                    "Tenant": "wifi-byod.telco.co.zw",
                    "ID": f"ATTR_{mac}"
                }
            ]
        }

        response = requests.post( url, json=data, headers=headers)

        return response.json()

    except:
        raise Exception('Failed to get account details')


def getAllSessions(url, usernames, tenant):

    try:
        data = {
            "method": "SessionSv1.GetActiveSessions",
            "params": [
                {
                    "Limit": None,
                    "Filters": [f"*prefix:~*req.Account:{usernames}"],
                    "Tenant": tenant,
                    "APIOpts": {}
                }
            ]
        }

        resp = requests.post(url, json=data, headers=headers)

        return resp.json()

    except:
        raise Exception('Failed to update account')


def getAllSessionsByOrig(url, origin_id, tenant):

    try:
        data = {
            "method": "SessionSv1.GetActiveSessions",
            "params": [
                {
                    "Limit": None,
                    "Filters": [f"*prefix:~*req.OriginID:{origin_id}"],
                    "Tenant": tenant,
                    "APIOpts": {}
                }
            ],
            "id": 5
        }

        resp = requests.post(url, json=data, headers=headers)
        return resp.json()

    except:
        raise Exception('Failed to update account')


def terminate_session(url, events_payload, tenant):
    try:

        payload = {
            "method": "SessionSv1.TerminateSession",
            "params": [
                {
                    "TerminateSession": True,
                    "ForceDuration": False,
                    "ReleaseResources": False,
                    "ProcessThresholds": False,
                    "ProcessStats": False,
                    "ThresholdIDs": None,
                    "StatIDs": None,
                    "Opts": {},
                    "Tenant": tenant,
                    "ID": events_payload["CGRID"],
                    "Event": events_payload
                }
            ],
            "id": 6
        }

        resp = requests.post(url, json=payload, headers=headers)
        return resp.json()

    except Exception as e:
        raise Exception('Failed to terminate_session')


def get_user_by_mac_cgrates(cgrates_url, mac, tenant):

    try:
        data = {
            "method": "APIerSv1.GetAttributeProfile",
            "params": [
                {
                    "Tenant": tenant,
                    "ID": f"ATTR_{mac}"
                }
            ]
        }


        resp = requests.post(cgrates_url, json=data, headers=headers)

        return resp.json()

    except:
        raise Exception('Failed to update account')
    
def get_user_by_mac(cgrates_url, mac, tenant):
    pass