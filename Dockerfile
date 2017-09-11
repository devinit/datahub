# The official nodejs docker image
FROM node:8.4-alpine

LABEL maintainer="epicallan.al@gmail.com"
# Copy package.json only to temp folder, install its dependencies,
# set workdir and copy the dependnecies there
RUN mkdir /src
# This way, dependnecies are cached without the need of cacheing all files.
ADD package.json /tmp/
RUN cd /tmp && npm install --production --silent
RUN cp -a /tmp/node_modules /src/

WORKDIR /src

# Copy the rest of the files to the container workdir
COPY . /src

ENV NODE_ENV production

# stattic data files
RUN npm run pull
# makes api calls that get cached on the API server
RUN npm run precache
RUN npm run build

EXPOSE 8080

CMD npm run start
