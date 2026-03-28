FROM python:3.11-slim
RUN useradd cjcon90
WORKDIR /var/www/personal-portfolio-cjcon90

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY cjcon90 cjcon90
COPY app.py config.py ./

ENV FLASK_APP app.py

RUN apt-get update && apt-get install -y curl --no-install-recommends && rm -rf /var/lib/apt/lists/*

RUN chown -R cjcon90:cjcon90 ./
USER cjcon90

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

CMD ["gunicorn", "-b", ":5000", "--access-logfile", "-", "--error-logfile", "-", "app:app"]
