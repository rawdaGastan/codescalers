FROM node:7

WORKDIR /code_scalers

COPY package.json /code_scalers

RUN npm install

COPY . /code_scalers

CMD node index.js

EXPOSE 3000