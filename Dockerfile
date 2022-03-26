FROM node:14.18-alpine

RUN apk update && apk upgrade
RUN apk add --no-cache python3 make g++
COPY . /home
WORKDIR /home

EXPOSE 3000

RUN yarn
VOLUME /home/node_modules

CMD yarn run sample
