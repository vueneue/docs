# Reference

## Context

This object is sent to [`asyncData()`](/guide/ssr.html#async-data-on-page) function in your pages components,
to [`onHttpRequest`](/guide/ssr.html#onhttprequest-store-action) store action, to the exported [`src/main.js` initialization function](/guide/ssr.html#initialize-function)
and to your defined [middlewares](/guide/ssr.html#middlewares).

| Variable name |        Type         | Description                                                                                       |
| ------------- | :-----------------: | ------------------------------------------------------------------------------------------------- |
| `app`         |    Vue instance     | The main component of the application                                                             |
| `router`      | Vue router instance | Router of the application. [Official docs](https://router.vuejs.org/api)                          |
| `store`       |    Vuex instance    | Vuex store. [Official docs](https://vuex.vuejs.org/api)                                           |
| `route`       |        Route        | The current route object. See: [Route Object](https://router.vuejs.org/en/api/route-object.html)  |
| `params`      |       Object        | Alias of `route.params`                                                                           |
| `query`       |       Object        | Alias of `route.query`                                                                            |
| `redirect`    |      Function       | Simple function to redirect to a specific page. [Docs](/reference/helpers.html#redirect-function) |
| `error`       |      Function       | Simple function to display an error page: [Docs](/reference/helpers.html#error-function)          |
| `url`         |       String        | URL of current page. **SSR only**                                                                 |
| `ctx`         |     Koa context     | The current koa context. See [Koa website](https://koajs.com/#context). **SSR only**              |

:::tip
This variables are also accessible from `this.$context` in your components
:::

## Process variables

Thanks to Webpack and his DefinePlugin, this starter inject some useful variables in your
project to handle some conditions based on build or environment context.

List of defined variables :

| Variable name    | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `process.dev`    | Return `true` in development mode, `false` otherwise                                        |
| `process.test`   | Is `true` if in test environment                                                            |
| `process.prod`   | Return `true` in production mode, `false` otherwise                                         |
| `process.spa`    | Return `true` in SPA mode, `false` in SSR mode                                              |
| `process.ssr`    | Return `true` in SSR mode, `false` in SPA mode                                              |
| `process.client` | In SSR mode only: return `true` if in client rendering, `false` if in server side rendering |
| `process.server` | In SSR mode only: return `true` if in server side rendering, `false` otherwise              |

:::tip
For environment variables see the official [Vue CLI documentation](https://cli.vuejs.org/guide/mode-and-env.html)
:::

## Configuration

Theses configuration are in `neue.config.js` in your root project folder.
Here is defaults values :

```js
module.exports = {
  ssr: {
    server: null,
    directives: {},
    https: null,
    // See: https://ssr.vuejs.org/api/#shouldpreload
    shoudPrefetch: null,
    shoudPreload: null,
  },
  generate: {
    paths: [],
    scanRouter: true,
    params: {},
  },
  templatePath: 'src/index.html',
  paths: {
    main: '@/main',
    store: '@/store',
    router: '@/router',
  },
  plugins: {},
};
```
