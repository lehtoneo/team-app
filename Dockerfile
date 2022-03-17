#frontend
FROM node:16 AS frontend-build-stage

ARG GRAPHQL_API_URL

WORKDIR /usr/src/frontend

COPY ./frontend .

RUN npm ci

ENV GRAPHQL_API_URL=$GRAPHQL_API_URL

RUN npm run build


#backend
FROM node:16.13.2-alpine3.14 as backend-ts-compiler
WORKDIR /usr/app
COPY ./backend/package*.json ./
COPY ./backend/tsconfig*.json ./
RUN npm install
COPY ./backend ./
RUN npm run build

FROM node:16.13.2-alpine3.14 as backend-ts-remover
WORKDIR /usr/app
COPY --from=backend-ts-compiler /usr/app/package*.json ./
COPY --from=backend-ts-compiler /usr/app/build ./
RUN npm install --only=production

FROM node:16.13.2-alpine3.14
WORKDIR /usr/app
COPY --from=backend-ts-remover /usr/app ./
COPY --from=frontend-build-stage /usr/src/frontend/build /usr/app/frontend-build
RUN apk update && apk add bash

CMD ["src/index.js"]