FROM node:16.14-alpine3.15
WORKDIR /react
COPY . . 
RUN npm run build