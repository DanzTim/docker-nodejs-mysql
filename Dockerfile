# syntax=docker/dockerfile:1

FROM node:16
LABEL maintainer="Dandi Temmu <dandi.temmu@hotmail.com>"
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 3030
CMD [ "node", "app.js" ]