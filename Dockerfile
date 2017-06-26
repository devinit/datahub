# docker file for the app, currently set up for storybooks
FROM node:7

RUN mkdir /src

# Provides cached layer for node_modules

ADD package.json /tmp/
RUN cd /tmp && npm install --ignore-scripts --silent
RUN cp -a /tmp/node_modules /src/

RUN npm -g install static-server --silent

# copy app files into
COPY . /src

WORKDIR /src

ENV NODE_ENV production
RUN npm run build
RUN npm run build-storybook

EXPOSE 3333
EXPOSE 6002

CMD npm run start-dev
