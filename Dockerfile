FROM node:alpine3.18 

WORKDIR /app

COPY . .

RUN npm run install-deps
RUN npm run build-app

CMD [ "npm", "run", "start-server" ]
