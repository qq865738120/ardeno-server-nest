FROM node:16
ENV TZ Asia/Shanghai
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start:prod" ]