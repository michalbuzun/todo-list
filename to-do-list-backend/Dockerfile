FROM node:20-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm i -s

COPY . .

EXPOSE 8000

CMD npm start
