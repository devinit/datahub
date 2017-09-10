FROM node:8.4-alpine

LABEL maintainer="epicallan.al@gmail.com"

RUN mkdir /src

# copy app files into
COPY . /src

WORKDIR /src

RUN npm install --production --silent

ENV NODE_ENV production

# stattic data files
RUN npm run pull
# makes api calls that get cached on the API server
RUN npm run precache
RUN npm run build

EXPOSE 8080

CMD npm run start
