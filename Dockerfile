FROM node:9-alpine@sha256:ba6622980a99d360f10a32bcc4290d27f5284117392defe184976deb7fbbb055

LABEL maintainer="epicallan.al@gmail.com"
# Copy package.json only to temp folder, install its dependencies,
# set workdir and copy the dependnecies there
RUN mkdir /src
# This way, dependnecies are cached without the need of cacheing all files.
COPY package.json /tmp/
RUN cd /tmp && npm install --production --silent
RUN cp -a /tmp/node_modules /src/

RUN npm install pm2 -g --silent

WORKDIR /src

# Copy the rest of the files to the container workdir
COPY . /src

ENV NODE_ENV production

EXPOSE 8080

CMD npm run start:docker

