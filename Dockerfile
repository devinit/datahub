FROM node:8.6-alpine

LABEL maintainer="epicallan.al@gmail.com"
# Copy package.json only to temp folder, install its dependencies,
# set workdir and copy the dependnecies there
RUN mkdir /src

WORKDIR /src

# Copy the rest of the files to the container workdir
COPY . /src

ENV NODE_ENV production

EXPOSE 8080

CMD npm run start

