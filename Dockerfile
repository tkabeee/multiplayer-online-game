FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

EXPOSE 8081
CMD [ "npm", "start" ]