# SSR features

## Async data on page

You can setup an `asyncData()` method on your pages components. This method will be called
before the page is created and you can load data from an API.

This method receive a [context](/reference/) as first argument and you
can populate your vuex store and your component data.

Example:

```js
export default {
  async asyncData({ store }) {
    const data = await api.get('some-data');

    // Populate your vuex store
    store.commit('SET_DATA', data.vuex);

    // Send data to current component
    return {
      foo: data.foo,
    };
  },
};
```

:::warning
You cannot use `this` in this method, because the component is not created yet
:::

## Initialize function

In the `src/main.js` file you can see an exported function. This one
is called when your application is ready to start. All base plugins
are available:

```js
/**
 * Init callback
 */
export async function initApp() {
  // Your code...
}
```

[See **Context** reference](/reference/)

The main purpose of this function is to init some Vue plugins or JS libraries according
to the build context (eg. don't start some lib that require `window` object in SSR mode)

Example:

```js
/**
 * Init callback
 */
export async function initApp() {
  if (process.client) {
    // Start you library with required window object
  }
}
```

[See **Process variables** reference](/reference/process.html)

## onHttpRequest store action

As you can see in `/src/store.js` file you have an action called `onHttpRequest`.
This action will be called before your application is ready. The second argument is
`context` which contain same [context](/reference/) data as **Initialize function**

This action is very similiar to [Nuxt `nuxtServerInit`](https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action)

In SPA mode too this action is called before application is ready.

## Middlewares

You can apply global or per-route middlewates. This functions are called before
`asyncData` method and `onHttpRequest` store action.

**Apply a middleware on all routes**

In `src/middlewares.js`:

```js
export default [
  async context => {
    // Do your check
  },
];
```

`context`: See [Context](/reference/)

**Apply a middleware on route**

In `src/router.js`:

```js{10-16}
import Router from 'vue-router';

export default () => {
  return new Router({
    mode: process.ssr ? 'history' : 'hash',
    routes: [
      {
        path: '/my-route',
        component: SomeComponent,
        meta: {
          middlewares: [
            async context => {
              // Do your check
            },
          ],
        },
      },
    ],
  });
};
```

## Head/Metas configuration

**[Official docs of vue-meta](https://github.com/declandewet/vue-meta)**

You can change default metas tags for your application in `src/App.vue` :

```js
export default {
  head: {
    titleTemplate(title) {
      return `${title} | VueNeue`;
    },
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'My awesome application' },
    ],
  },
};
```

Then you can change theses values in each pages component.

## No-SSR component

[Official docs](https://github.com/egoist/vue-no-ssr)

## Generate static files

You can generate a static website with a simple command:

```bash
npm run generate
```

Default configuration will parse your application routes and generate a HTML file for each.

You can configure pre-rendering behavior in `vue.config.js`:

```js
module.exports = {
  pluginOptions: {
    // Default values
    generate: {
      paths: [],
      scanRouter: true,
      params: {},
    },
  },
};
```

**Options**

- `paths`: Useful if `scanRouter` is disabled or a route is not rendered. Fill this
  variable with an array of route paths
- `scanRouter`: Automatic fetch routes paths from you application router (`src/router.js`)
- `params`: Define possibles values for your dynamic routes.
  Example:
  ```js
  {
    path: '/:lang/about',
    component: AboutPage,
  }
  ```
  In your config:
  ```js
  {
    params: {
      lang: [null, 'en', 'fr'],
    },
  }
  ```
  Will generate these pages :
  ```
  /about
  /en/about
  /fr/about
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

:::warning
You cannot move or delete some base files, beceause this plugin need them
to work properly:

- `src/main.js`
- `src/router.js`
- `src/store.js`
- `src/middlewares.js`
- `src/vueneue/index.html` (Needed to render page on server side)
- `src/vueneue/ErrorPage.vue` (Needed to display errors pages)

But your are free to edit them !

This restriction will be removed in future version
:::
