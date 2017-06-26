# docker file for the app, currently set up for storybooks
FROM node:7

RUN mkdir /src

# Provides cached layer for node_modules

ADD package.json /tmp/
RUN cd /tmp && npm install --ignore-scripts --silent
RUN cp -a /tmp/node_modules /src/

# copy app files into
COPY . /src

WORKDIR /src

ENV NODE_ENV production
RUN npm run build

EXPOSE 3333

CMD npm run start
