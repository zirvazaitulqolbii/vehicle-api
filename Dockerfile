FROM node:21-alpine3.18

WORKDIR /opt/app

COPY package.*json ./

RUN apk update && apk add openssl
RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm run prisma generate

CMD ["npm", "run", "start"]