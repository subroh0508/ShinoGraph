FROM openjdk:19-slim-buster

RUN apt-get update && apt-get upgrade && apt-get install -y wget
COPY . /home/

WORKDIR /home

RUN ./gradlew setup
VOLUME /home/jar /home/lib /home/bin /home/run/dataset
CMD ./gradlew start
