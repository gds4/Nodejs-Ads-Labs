FROM node:20.13.1-alpine

WORKDIR /usr/app/src

COPY package*.json /usr/app

RUN npm install

COPY ./src .

EXPOSE 3000

CMD ["npm", "start"]