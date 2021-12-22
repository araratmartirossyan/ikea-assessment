FROM node:15.12.0

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY package*.json /app
COPY yarn.lock /app

RUN yarn

COPY . .

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]