FROM node:10.13.0 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# instead lines 4 and 6
# RUN yarn && yarn build && rm -rf ./node_modules 
# i dont know what is better so choose what you want

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]