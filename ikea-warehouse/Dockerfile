FROM node:14 AS development

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

WORKDIR /usr/src/ikea-warehouse

COPY package*.json /usr/src/back/
COPY yarn.lock /usr/src/back/

RUN yarn

COPY . .
RUN yarn build
CMD /wait && yarn start:dev

FROM node:14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/ikea-warehouse

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]