from flask import render_template, redirect, url_for, \
    Blueprint, request, flash, current_app
from cjcon90.main.utils import send_email


SKILLS = ["JavaScript", "Python", "Flask", "Django", "Sass", "Tailwind", "Docker", "Linux"]
PROJECTS = [
    {
        "title": "The Rhythm Box",
        "description": "E-commerce site feat. user auth, order history, reviews & product filtering/ sorting. Built with Django, SQL, Stripe payments and Sass",
        "repo": "https://github.com/cjcon90/the_rhythm_box",
        "live": "https://therhythmbox.herokuapp.com/",
        "image": "images/projects/the_rhythm_box-sm.webp"
    },
    {
        "title": "Hot Dogz",
        "description": "A dog-themed photo sharing Python Flask app, where users can open accounts, upload, like, favourite and comment on photos.",
        "repo": "https://github.com/cjcon90/hot-dogz",
        "live": "https://hot-dogz.herokuapp.com",
        "image": "images/projects/hot-dogz-sm.webp",
    },
    {
        "title": "Country Quiz",
        "description": "A JavaScript Quiz App build using the REST Countries API, with region and difficulty selectors.",
        "repo": "https://github.com/cjcon90/country-quiz",
        "live": "https://cjcon90.github.io/country-quiz/",
        "image": "images/projects/country-quiz-sm.png",
    },
    {
        "title": "SafeTree",
        "description": "Fully responsive, static landing page for a fictional Adventure Therapy organisation, showcasing clean and aesthetically pleasing UX & UI",
        "repo": "https://github.com/cjcon90/safetree",
        "live": "https://cjcon90.github.io/safetree/",
        "image": "images/projects/safetree-sm.png",
    },
]


main = Blueprint('main', __name__)


@main.route('/', methods=['GET', 'POST'])
def index():
    """
	Route for main portfolio landing page
    """
    if request.method == 'POST' and not _is_spambot(request.form):
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
        flash("Thanks for getting in touch!  👍")
    return render_template('main/index.html', skills=SKILLS, projects=PROJECTS)

def _is_spambot(form):
    return any([form["url"],form["phone"]])

