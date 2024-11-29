FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install -g prisma

RUN npm install

COPY . .

RUN prisma generate