from flask import render_template, redirect, url_for, \
    Blueprint, request, flash, current_app
from cjcon90.main.utils import send_email

main = Blueprint('main', __name__)


@main.route('/', methods=['GET', 'POST'])
def index():
    """
	Route for main portfolio landing page
    """
    if request.method == 'POST':
        send_email(subject='[CJCON90.DEV] Contact Form Submission',
                   sender=current_app.config['ADMINS'][0],
                   recipients=[current_app.config['ADMINS'][1]],
                   text_body=render_template('email/contact_message.txt',
                                             name=request.form['name'],
                                             email=request.form['email'],
                                             msg=request.form['message']),
                   html_body=render_template('email/contact_message.html',
                                             name=request.form['name'],
                                             email=request.form['email'],
                                             msg=request.form['message']))
        flash("Message successfully sent!  👍")
    return render_template('main/index.html')
