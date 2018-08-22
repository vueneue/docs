# Server config

Under the wood, this plugin use a [Koa](https://koajs.com/) server, you can customize its
behavior in `neue.config.js` file.

## Middlewares

You can add middlewares to Koa instance:

In `neue.config.js`

```js
const compress = require('koa-compress');

module.exports = {
  ssr: {
    server(app) {
      // `app` is the Koa instance here
      app.use(compress()):
    },
  },
};
```

## SSR Directives

You can add Vue directives definition for SSR

In `neue.config.js`

```js
module.exports = {
  ssr: {
    directives: {
      // Your directives here
    },
  },
};
```

[See official docs](https://ssr.vuejs.org/api/#directives)

## Use HTTPS

In `neue.config.js`

```js
module.exports = {
  ssr: {
    https: {
      key: fs.readFileSync('path/to/key.pem', 'utf-8'),
      cert: fs.readFileSync('path/to/cert.pem', 'utf-8'),
    },
  },
};
```

## Docker

When you invoke this plugin you can choose to add a Dockerfile in your app.
You can use it to deploy your project with [Docker](https://www.docker.com/).
It's ready for production !

**Example:**

```bash
docker build -t <image> .
docker run -d -p 8080:8080 --name vueneue <image>
```

**Dockerfile content:**

```Dockerfile
FROM node:10 as builder

ENV NODE_ENV production

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app
RUN yarn --production=false

COPY . /home/node/app

RUN yarn ssr:build && \
  yarn --production && \
  yarn add core-js regenerator-runtime && \
  yarn cache clean

#######################################################
FROM node:10-alpine

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 8080

COPY --from=builder /home/node/app /home/node/app

RUN chown -R node:node /home/node/app

USER node
WORKDIR /home/node/app

CMD ["./node_modules/@vueneue/ssr-server/docker"]
```

**dockerignore content:**

```
node_modules/
dist/
```
