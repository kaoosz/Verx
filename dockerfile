FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3008

CMD ["npm", "start"]
