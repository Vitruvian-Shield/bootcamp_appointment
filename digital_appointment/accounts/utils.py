from django.core.cache import cache
import random
import requests
import datetime


def send_quick_otp(mobile):
    """
    Send a quick OTP using AmootSMS API.

    Args:
        mobile (str): The mobile number to send the OTP to.
        line_number (str): The length of the OTP code.
        send_date_time (datetime): An optional code to include in the request.

    Returns:
        dict: The JSON response from the AmootSMS API.
    """
    """rest api sms panel token"""
    token = "A10FD5F3C01EAAF32E69DE9DD535030515BB431B"
    """default config"""
    line_number = "public"
    random_code_auth = random.randint(100000, 999999)
    cache.set(mobile, random_code_auth, timeout=300)

    data = {
        "SendDateTime": datetime.datetime.now().isoformat(),
        "SMSMessageText": f'سلام به کاربر محترم ویترووین شیلد کد احراز شما {random_code_auth}',
        "LineNumber": line_number,
        "Mobiles": mobile
    }
    headers = {
        "Authorization": token
    }
    response = requests.post("https://portal.amootsms.com/rest/SendSimple", data=data, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return None


def verify_sms_code(user_phone, code):
    """for verify sms code"""
    stored_code = cache.get(user_phone)
    return stored_code == code
