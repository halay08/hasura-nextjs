FROM node:14.17 as builder
LABEL maintainer="Ken Le"
ENV NODE_OPTIONS=--max_old_space_size=4096

ARG NPM_TOKEN=$(NPM_TOKEN)

WORKDIR /app

COPY ./*.json ./
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc
RUN echo "@halay08:registry=https://npm.pkg.github.com" >> .npmrc

RUN npm i

COPY . .

RUN npm run build

#prepare nginx
FROM nginx:1.21.5-alpine

COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

#fire up nginx
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
