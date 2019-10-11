FROM node:10.16.3-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]