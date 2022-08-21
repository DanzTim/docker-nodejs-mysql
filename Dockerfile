FROM node:alpine
LABEL maintainer="Dandi Temmu <dandi.temmu@hotmail.com>"
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3030
CMD [ "node", "app.js" ]