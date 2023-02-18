SECRET = '6FUlP7HuLHOTSPOTqfIcW_H7l6X_NQoiBsXFc0IDWiP3uS1vlmNzAVmZjWZjv1nmIirvRvdzJ2PUQ'

pin = ""

max_upload = 10240

max_download = 10240

attrs = [{
                "FilterIDs": [],
                "Path": "*req.PasswordFromAttributes",
                "Type": "*constant",
                "Value": [{
                    "Rules": pin
                }]
            }, {
                "FilterIDs": [],
                "Path": "*req.Group",
                "Type": "*constant",
                "Value": [{
                    "Rules": "WiFi Bundle"
                }]
            }, {
                "FilterIDs": [],
                "Path":
                "*req.Mikrotik-Rate-Limit",
                "Type":
                "*constant",
                "Value": [{
                    "Rules":
                    f"{max_upload}/{max_download}"
                }]
            }, {
                "FilterIDs": [],
                "Path": "*req.Acct-Interim-Interval",
                "Type": "*constant",
                "Value": [{
                    "Rules": "15"
                }]
            }, {
                "FilterIDs": [],
                "Path": "*req.Framed-IP-Address",
                "Type": "*constant",
                "Value": [{
                    "Rules": "192.168.10.2"
                }]
            }]


odoo_url = "https://telco-wifi.ipos.co.zw"
base_url = f"{odoo_url}/api/v1/hotspot"
cgrates_url= "http://41.191.236.45:2080/jsonrpc"
tenant = "wifi-byod.telco.co.zw"
sms_url =  "https://hotspot.openaccess.co.zw/ibsng_odoo_customer_data/sms_notification.php"

RADIUS_DB = 'radius'
RADIUS_USER = 'radius'
RADIUS_PASSWORD = 's3rv3r5mxdb'
RADIUS_HOST = 'wifi-byod-db'
RADIUS_PORT = "5432"

odoo_user = "odoo_dev"
odoo_password = "7f8b4c51-9301-4318-8767-1f663ed6b81e"