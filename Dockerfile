FROM node:18-alpine

WORKDIR /app

COPY . .

WORKDIR /app/client
RUN npm install --include=dev

WORKDIR /app/server
RUN npm install

WORKDIR /app
RUN npm run build-app

CMD [ "npm", "run", "start-server" ]
