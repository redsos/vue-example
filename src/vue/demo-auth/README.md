# demo-auth

## Project setup
```
docker run --rm -it -p 6100:6100 -v `pwd`:/data/web -v /etc/localtime:/etc/localtime:ro -w /data/web --name dex-app node:10-alpine sh

docker exec -it dex-app npm install
```

### Compiles and hot-reloads for development
```
# 取消主机名检查
#sed -i 's/this\.disableHostCheck = !!this\.options\.disableHostCheck/this\.disableHostCheck = true/g' node_modules/@vue/cli-service/lib/commands/serve.js

# 取消测试环境主机名检查, 方便外部测试.
docker exec -it dex-app sed -i 's/this\.disableHostCheck = !!this\.options\.disableHostCheck;/this\.disableHostCheck = true;/g' node_modules/webpack-dev-server/lib/Server.js

docker exec -it dex-app npm run serve
```

### Compiles and minifies for production
```
docker exec -it dex-app npm run build
```

### Lints and fixes files
```
npm run lint
```
