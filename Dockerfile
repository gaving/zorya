FROM node:12

WORKDIR /cli

COPY . /cli

RUN yarn

CMD ["yarn", "start"]