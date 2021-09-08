import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    # Flask Secret Key
    SECRET_KEY = os.environ.get('SECRET_KEY')

    # Email configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_DEFAULT_SENDER = ('Ciaran Concannon', 'cjcon90@gmail.com')
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    ADMINS = ['cjcon90@gmail.com', 'cjcon90@pm.me']
