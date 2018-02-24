FROM node:8.9-alpine@sha256:eae6c7c7cc06944b03ad8ee78d0cfb2b829b2836b9427ccc1103f2ea3d34ec4c

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

