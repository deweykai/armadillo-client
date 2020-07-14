ARG version

FROM node:latest as branch-development
WORKDIR /code
ENV HOST=0.0.0.0
ENV PORT=80
ENV CI=true
CMD ["npm", "start"]

FROM nginx as branch-production
COPY ./build /usr/share/nginx/html

FROM branch-${version} AS final
