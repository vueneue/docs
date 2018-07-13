# Vue CLI plugins

Here are some tips to use some other Vue CLI plugins with VueNeue

:::warning
Work in progress !

I'll try to make this plugins compatible without any code change on your side.

I'm waiting for this issues to be implemented in Vue CLI:

- [https://github.com/vuejs/vue-cli/issues/845](https://github.com/vuejs/vue-cli/issues/845)
- [https://github.com/vuejs/vue-cli/issues/1754](https://github.com/vuejs/vue-cli/issues/1754)

:::

## PWA

:::tip
You don't need to do this if you add or invoke @vueneue/ssr after @vue/pwa
:::

The PWA built-in plugin will normally include `registerServiceWorker.js` in `src/main` like this:

```js
import './registerServiceWorker';
```

But this is not compatible with SSR, so you need to include it only on client side :

```js
if (process.client) {
  require('./registerServiceWorker');
}
```

In your `vue.config.js` please add this:

```js
module.exports = {
  pwa: {
    workboxOptions: {
      templatedUrls: {
        '/': 'index.ssr.html',
      },
    },
  },
};
```

## TypeScript

:::tip
You don't need to do this if you add or invoke @vueneue/ssr after @vue/typescript
:::

In `src/main.ts` you need to `any` to first argument passed to `createApp()` function:

```js{1}
export function createApp({ router, store }: any) {
  return new Vue({
    router,
    store,
    render: h => h(App)
  });
}
```

## Vue i18n

:::tip
You don't need to do this if you add or invoke @vueneue/ssr after i18n plugin
:::

1.  In `src/i18n.js` created by i18n plugin, change default export by this:

```js
export default () => {
  return new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages(),
  });
};
```

2.  In `src/main.js`

```js{1,7}
import createI18n from './i18n';

export function createApp({ router, store }) {
  return new Vue({
    router,
    store,
    i18n: createI18n(),
    render: h => h(App)
  });
}
```

## Apollo

:::warning
Hard workaround / Not tested
:::

1.  Add vue-apollo client to transpile dependencies in `vue.config.js`

```js
module.exports = {
  // ...
  transpileDependencies: [/vue-cli-plugin-apollo\/graphql-client\/dist/],
  // ...
};
```

2.  Install `isomorphic-fetch`

```bash
npm i -S isomorphic-fetch
```

3.  Change configuration in `src/vue-apollo.js`

```js
// Add isomorphic-fetch to build
import 'isomorphic-fetch';
// ...
const defaultOptions = {
  // ...
  // Enable SSR on server side
  ssr: !!process.server,
  // ...
};
// ...
```

4.  Comment/delete `localStorage` lines in `src/vue-apollo.js`
