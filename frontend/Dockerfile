FROM node:14.18-alpine

RUN apk update && apk upgrade
COPY . /home
WORKDIR /home

EXPOSE 8000

RUN yarn

CMD yarn run dev
