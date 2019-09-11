# base image
FROM node:8

RUN mkdir -p /usr/src
# set working directory
WORKDIR /usr/src
RUN npm i react
# add `/app/node_modules/.bin` to $PATH
ADD package.json /usr/src/

COPY . /usr/src
RUN npm install
CMD npm start
# start app
# CMD ["npm", "start"]
EXPOSE 3000