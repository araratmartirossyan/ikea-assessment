# # pull official base image
# FROM node:14

# # set working directory
# WORKDIR /app

# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# ADD . .


# COPY package.json ./
# COPY yarn*.json ./
# RUN yarn

# ENTRYPOINT ["/entrypoint.sh"]

# EXPOSE 3000
# # add app
# COPY . ./

# # start app
# CMD ["yarn", "dev"]

FROM node:15.12.0

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]