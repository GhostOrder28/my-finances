FROM node:18-alpine as base

WORKDIR /app

COPY . .

RUN npm install --include=dev
RUN npm run build

FROM caddy:latest
RUN apk add --no-cache jq
COPY --from=base /app/build/ /srv
COPY --from=base /app/Caddyfile /etc/caddy/Caddyfile

EXPOSE 3000
EXPOSE 443
