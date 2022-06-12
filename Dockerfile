FROM node:16-alpine as build
WORKDIR /front
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM nginx:1.19-alpine
VOLUME /var/cache/nginx
COPY --from=build /front/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]

