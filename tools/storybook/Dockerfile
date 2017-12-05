FROM node:8.7-alpine

LABEL maintainer="epicallan.al@gmail.com"
# Copy package.json only to temp folder, install its dependencies,
# set workdir and copy the dependnecies there
RUN mkdir /src
# This way, dependnecies are cached without the need of cacheing all files.
COPY package.json /tmp/
RUN cd /tmp && npm install --silent --ignore-scripts
RUN cp -a /tmp/node_modules /src/

WORKDIR /src

# Copy the rest of the files to the container workdir
COPY . /src

ENV NODE_ENV production

EXPOSE 6006

RUN npm run build-storybook

RUN npm install -g node-static

WORKDIR /src/.out

CMD static -a 0.0.0.0 -p 6006 -z

