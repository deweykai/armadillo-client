FROM nginx as branch-production
COPY ./build /usr/share/nginx/html

FROM branch-${version} AS final
