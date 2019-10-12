
FROM alpine

RUN apk add bash nodejs npm
#RUN apk add python pkgconf

COPY entrypoint.sh /

RUN mkdir /app
RUN mkdir /app/bin

COPY app.js /app
COPY package.json /app
COPY bin/www /app/bin
COPY lib /app/lib
COPY public /app/public
COPY routes /app/routes
COPY test /app/test
COPY views /app/views

WORKDIR /app

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]

