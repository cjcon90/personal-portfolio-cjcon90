FROM python
RUN useradd cjcon90
WORKDIR /var/www/personal-portfolio-cjcon90

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY cjcon90 cjcon90
COPY app.py config.py ./

ENV FLASK_APP app.py

RUN chown -R cjcon90:cjcon90 ./
USER cjcon90

EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "--access-logfile", "-", "--error-logfile", "-", "app:app"]
