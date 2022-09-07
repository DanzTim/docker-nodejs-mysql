FROM node:alpine
LABEL maintainer="Dandi Temmu <dandi.temmu@hotmail.com>"
WORKDIR /app
COPY . .
RUN npm install --omit=dev
EXPOSE 3030
CMD [ "npm", "run", "start" ]