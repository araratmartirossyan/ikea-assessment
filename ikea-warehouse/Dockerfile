FROM node:14 AS development

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

WORKDIR /usr/src/ikea-warehouse

COPY package*.json /usr/src/ikea-warehouse/
COPY yarn.lock /usr/src/ikea-warehouse/

RUN yarn
RUN yarn build

COPY . .
CMD /wait && yarn start:dev
