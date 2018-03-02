FROM node:9-alpine@sha256:ade71de65f02490f349cbecfd7218a56386971141f4673e6f99eb8ff7f343e8c

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

CMD npm run start

