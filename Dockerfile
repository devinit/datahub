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

# stattic data files
RUN npm run pull
RUN npm run build

EXPOSE 8888

CMD npm run start
