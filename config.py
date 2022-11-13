import os
from dotenv import load_dotenv

load_dotenv()


class Config(object):
    # Flask Secret Key
    SECRET_KEY = os.environ.get("SECRET_KEY")
    RECAPTCHA_SECRET_KEY = os.environ.get("RECAPTCHA_SECRET_KEY")
    RECAPTCHA_SITE_KEY = os.environ.get("RECAPTCHA_SITE_KEY")

    # Email configuration
    MAIL_SERVER = "mail.privateemail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    ADMINS = ["ciaran@cjcon90.dev"]
