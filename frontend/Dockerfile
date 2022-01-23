FROM node:14.18-alpine

RUN apk update && apk upgrade
COPY . /home
WORKDIR /home

EXPOSE 3000

RUN yarn
VOLUME /home/node_modules

CMD yarn run dev
