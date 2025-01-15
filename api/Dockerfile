FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --include=dev
RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 4000
