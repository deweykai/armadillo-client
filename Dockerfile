ARG version

FROM node:latest AS base

FROM base as branch-development
WORKDIR /code
ENV HOST=0.0.0.0
ENV PORT=80
ENV CI=true
CMD ["npm", "start"]

FROM base as build
WORKDIR /code
COPY . .
RUN yarn run build

FROM nginx as branch-production
COPY --from=build /code/build /usr/share/nginx/html

FROM branch-${version} AS final
