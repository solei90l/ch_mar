FROM node:12 as build-stage

RUN mkdir -p /usr/src/app

ARG NODE_ENV

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200 49153

CMD [ "npm", "run", "start:dev" ]

