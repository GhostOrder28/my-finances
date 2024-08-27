FROM node:18-alpine

WORKDIR /app

COPY . .

WORKDIR /app/client
RUN npm install --include=dev

WORKDIR /app/server
RUN npm install --include=dev

WORKDIR /app
RUN npm run build-app

CMD [ "npm", "run", "start-server" ]

EXPOSE 8080
EXPOSE 4000
