FROM node:8

LABEL maintainer="epicallan.al@gmail.com"

RUN mkdir /src

# Provides cached layer for node_modules

COPY package.json /tmp/
RUN cd /tmp && npm install --production --silent
RUN cp -a /tmp/node_modules /src/

# copy app files into
COPY . /src

WORKDIR /src

ENV NODE_ENV production

RUN npm run build

# pulls in new static api data
RUN npm run pull

EXPOSE 9999

CMD npm run start
