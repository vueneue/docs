# Start

## From a fresh new Vue CLI project

You just need to add VueNeue plugin with the Vue CLI:

```bash
vue add @vueneue/ssr
```

or

```bash
npm install -D @vueneue/vue-cli-plugin-ssr
vue invoke @vueneue/ssr
```

The plugin will modify bases files listed in [Base files/code structure](#base-files-code-structure)
automatically, so, after installation, you're good to go !

## From an existing project

If you have already started a project and you have moved some base files, you
need to indicate where are placed your files that instanciate the Vue app, router, and the store.

You can do it in the `vue.config.js` file:

```js
module.exports = {
  pluginOptions: {
    paths: {
      main: './src/main', // File where you do a new Vue
      router: './src/router', // File where you do a new Router
      store: './src/store', // File where you do a new Vuex.Store
      middlewares: './src/middlewares', // File that export middlewares array
      index: './src/vueneue/index.html', // HTML Template to render pages
    },
  },
};
```

Paths are relative to your project folder and you can use your Webpack resolve alias too.

If they don't exists, this plugin will create them. When you are ready,
you can add/install VueNeue plugin:

```bash
vue add @vueneue/ssr
```

or

```bash
npm install -D @vueneue/vue-cli-plugin-ssr
vue invoke @vueneue/ssr
```

## Base files/code structure

Due to SSR behaviors you will see some changes on Vue app, router and store
instanciation: plugin will use a factory function for them: [Avoid Stateful Singletons](https://ssr.vuejs.org/guide/structure.html#avoid-stateful-singletons)

`src/main.js`

```js
export function createApp({ router, store }) {
  // router and store are create by plugin and
  // injected to this function
  return new Vue({
    router,
    store,
    render: h => h(App),
  });
}
```

`src/router.js`

```js
export default () => {
  return new Router({
    // In SSR mode we use the 'history' mode
    // for router to have clean URLs
    mode: process.ssr ? 'history' : 'hash',
    routes: [],
  });
};
```

`src/store.js`

```js
export default () => {
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
      // This action is called on each HTTP request
      // and will not be called in futures navigations
      async onHttpRequest({ commit }, { url }) {},
    },
  });
};
```

VueNeue plugin have 2 more files needed to work properly;

`src/middlewares.js'

This file export an array of [middlewares]() to apply on all routes.
You can customize its path in `vue.config.js` with the property: `pluginOptions.paths.middlewares`

`src/vueneue/index.html`

Is the base HTML template to render your pages on server side.
You can customize its path in `vue.config.js` with the property: `pluginOptions.paths.index`
