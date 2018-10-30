# Nginx based web server
FROM nginx:alpine as kfb-fe
COPY ./src /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx_proxy.conf /etc/nginx/nginx_proxy.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
