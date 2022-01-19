FROM openjdk:19-slim-buster as build-data

RUN apt-get update && apt-get upgrade && apt-get install -y wget
COPY . /home/

WORKDIR /home

RUN ./gradlew setup

FROM openjdk:19-slim-buster

COPY --from=build-data /home/jar/jena-fuseki-server*.jar /jena-fuseki-server.jar
COPY --from=build-data /home/run/ /run/

CMD java -jar jena-fuseki-server.jar --port=3000 --config=run/config.ttl
