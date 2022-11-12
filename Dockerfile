FROM python
RUN useradd cjcon90
WORKDIR /var/www/personal-portfolio-cjcon90
COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt

COPY cjcon90 cjcon90
COPY app.py config.py boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP app.py

RUN chown -R cjcon90:cjcon90 ./
USER cjcon90

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
