FROM node:8

LABEL maintainer="epicallan.al@gmail.com"

RUN mkdir /src

# copy app files into
COPY . /src

WORKDIR /src

RUN npm install --production --silent

ENV NODE_ENV production

# stattic data files
RUN npm run pull
RUN npm run build

EXPOSE 8080

CMD npm run start
