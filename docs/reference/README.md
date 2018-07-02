# Context

This object is sent to [`asyncData()`](/guide/ssr.html#async-data-on-page) function in your pages components,
to [`onHttpRequest`](/guide/ssr.html#onhttprequest-store-action) store action, to [`initApp()`](/guide/ssr.html#initialize-function) callback and to your defined [middlewares](/guide/ssr.html#middlewares).

| Variable name |        Type         | Description                                                                                      |
| ------------- | :-----------------: | ------------------------------------------------------------------------------------------------ |
| `app`         |    Vue instance     | The main component of the application                                                            |
| `router`      | Vue router instance | Router of the application. [Official docs](https://router.vuejs.org/api)                         |
| `store`       |    Vuex instance    | Vuex store. [Official docs](https://vuex.vuejs.org/api)                                          |
| `route`       |        Route        | The current route object. See: [Route Object](https://router.vuejs.org/en/api/route-object.html) |
| `params`      |       Object        | Alias of `route.params`                                                                          |
| `query`       |       Object        | Alias of `route.query`                                                                           |
| `redirect`    |      Function       | Simple function to redirect to a specific page. [Docs](/reference/helpers.html#redirect)         |
| `error`       |      Function       | Simple function to display an error page: [Docs](/reference/helpers.html#error)                  |
| `url`         |       String        | The URL of current page. **SSR only**                                                            |
| `ctx`         |     Koa context     | The current koa context. See [Koa website](https://koajs.com/#context). **SSR only**             |

:::tip
This variables are also accessible from `this.$context` in your components
:::
