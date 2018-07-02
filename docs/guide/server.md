# Server customization

Under the wood, this plugin use a [Koa](https://koajs.com/) server, you can customize its
behavior in `vue.config.js` file.

## Middlewares

You can middlewares to Koa instance:

`vue.config.js`

```js
const compress = require('koa-compress');

module.exports = {
  pluginOptions: {
    ssr: {
      server(app) {
        // `app` is the Koa instance here
        app.use(compress()):
      },
    },
  },
};
```

## SSR Directives

You can Vue directives definition for SSR

`vue.config.js`

```js
module.exports = {
  pluginOptions: {
    ssr: {
      directives: {
        // Your directives here
      },
    },
  },
};
```

[See official docs](https://ssr.vuejs.org/api/#directives)

## Docker

When you invoke this project you can add a Dockerfile in your project.
You can use it to deploy your project with [Docker](https://www.docker.com/).
It's ready for production !

**Example:**

```bash
docker build -t <image> .
docker run -d -p 3000:3000 --name vue-starter <image>
```

**Dockerfile content:**

```Dockerfile
FROM node:10 as builder

ENV NODE_ENV development

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app
RUN yarn

COPY . /home/node/app

ENV NODE_ENV production

RUN yarn ssr:build && \
  yarn --production && \
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

CMD ["node", "./start.js"]
```
