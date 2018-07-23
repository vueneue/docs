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

## Plugins system

In the `neue.config.js` youn can define a list of plugins to call:

```js
module.exports = {
  plugins: {
    // Plugin called on server & client side
    pluginName: '@/path/to/plugin',
    // Plugin called only on client side
    pluginClient: {
      src: '@/path/to/plugin-client',
      ssr: false,
    },
  },
};
```

Each plugin can export a default async function. The first argument will
be the [context variable](/reference/). With this function you can register addional store
properties, add routes or use library that only works on client side:

file you can see an exported function. This one
is called when your application is ready to start. All base plugins
are available:

```js
export default async ({ store, router }) => {
  store.registerModule(/* ... */);
  router.addRoutes([
    /* ... */
  ]);

  // Only executed on client side
  if (process.client) {
    // Your code
  }
};
```

[See **Process variables** reference](/reference/#process-variables)

## onHttpRequest store action

As you can see in `/src/store.js` file you have an action called `onHttpRequest`.
This action will be called before your application is ready. The second argument is a
[`context` variable](/reference/).

This action is very similiar to [Nuxt `nuxtServerInit`](https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action)

In SPA mode too this action is called before application is ready.

## Middlewares

You can apply global or per-route middlewates. This functions are called before
`asyncData` method and `onHttpRequest` store action.

**Apply a middleware on all routes**

In your `src/main.js`, in the Vue instanciation, just add a `middlewares` property:

```js
export default () => {
  return new Vue({
    router,
    store,
    middlewares: [
      async context => {
        // You code here
      },
    ],
    render: h => h(App),
  });
};
```

This function can return a promise and accept one argument:

`context`: See [Context](/reference/)

**Apply a middleware on route component**

Like for global middleware you can set the property `middlewares` on
your pages components:

```js
export default {
  template: '<div/>',
  middlewares: [
    async context => {
      // You code here
    },
  ],
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

You can use it like this:

```html
<template>
  <div>

    <p>I will be rendered on server-side</p>

    <no-ssr>
      <p>I will not be rendered on server-side</p>
    </no-ssr>

  </div>
</template>
```

## Generate static files

You can generate a static website with a simple command:

```bash
npm run generate
```

Default configuration will parse your application routes and generate a HTML file for each.

You can configure pre-rendering behavior in `neue.config.js`:

```js
module.exports = {
  // Default values
  generate: {
    paths: [],
    scanRouter: true,
    params: {},
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

## SPA on routes

In some cases you don't need or want SSR for some pages of your application (e.g. administration
dashboard, logged pages...)

It's possible to disable it with a simple configuration, in `neue.config.js`:

```js
module.exports = {
  spaPaths: ['/admin', '/admin/**/*'],
};
```

As you can see glob paths are supported.
