FROM openjdk:11-jre-slim-buster as build-data

RUN apt update && apt install -y wget
COPY . /home/

WORKDIR /home

RUN ./gradlew setup

FROM openjdk:11-jre-slim-buster

COPY --from=build-data /home/jar/jena-fuseki-server*.jar /jena-fuseki-server.jar
COPY --from=build-data /home/run/ /run/

CMD java -jar jena-fuseki-server.jar --port=3000 --config=run/config.ttl
