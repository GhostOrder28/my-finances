FROM node:18-alpine

WORKDIR /app

ARG MONGO_CONNECTION_STRING
ARG COOKIE_SESSION_KEY_1
ARG COOKIE_SESSION_KEY_2
ARG CLIENT_DOMAIN

COPY . .

RUN npm install --include=dev
RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 4000
