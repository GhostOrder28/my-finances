FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g @vue/cli

RUN NODE_ENV=development npm run install-deps
RUN npm run build-app

CMD [ "npm", "run", "start-server" ]
