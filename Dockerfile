FROM python:3.8-slim-buster

RUN pip install requests flask flask_cors pandas

COPY ./ /etc/speed-splits

EXPOSE 5000

WORKDIR /etc/speed-splits/backend

ENV FLASK_APP=App.py
ENV FLASK_DEBUG=0
ENV FLASK_ENV=production
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["python", "-m", "flask", "run"]
