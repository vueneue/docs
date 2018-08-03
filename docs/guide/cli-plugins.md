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

In `src/main.ts` you need to `any` to first argument passed to exported default function:

```js{1}
export default ({ router, store }: any) => {
  return new Vue({
    router,
    store,
    render: h => h(App)
  });
}
```

You need to add a path to your `tsconfig.json`, if you want to use
[Vue class components helper](/reference/helpers.html#vue-class-components):

```json
{
  "compilerOptions": {
    "paths": {
      "neuets": "node_modules/@vueneue/ssr-core/neuets"
    }
  }
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

export default ({ router, store }) => {
  return new Vue({
    router,
    store,
    i18n: createI18n(),
    render: h => h(App)
  });
}
```

## Apollo

:::tip
You don't need to do this if you add or invoke @vueneue/ssr after apollo
:::

:::warning
But if you invoke apollo after @vueneue/ssr you need to modify a lots of things.
:::

1.  Include `@/plugin/apollo` to `neue.config.js`

```js
module.exports = {
  plugins: {
    apollo: '@/plugins/apollo',
  },
};
```

2.  Change code in `src/vue-apollo.js` like this:

```js{1-2,6-7,9-14,17-18,22-23,31-32,38-39}
// Add this import:
import { getAuth } from './plugins/apollo';

// ...

// Remove this line
Vue.use(VueApollo);

// Add this condition
if (!Vue.prototype.hasOwnProperty('$filesRoot')) {
  Object.defineProperty(Vue.prototype, '$filesRoot', {
    get: () => filesRoot,
  });
}

const defaultOptions = {
  // Change this value:
  ssr: !!process.server,
};

export function createProvider(options = {}) {
  // Add this line:
  defaultOptions.getAuth = getAuth(AUTH_TOKEN, options.ctx);

  // ...

  return apolloProvider;
}

export async function onLogin(apolloClient, token) {
  // Replace localStorage line by this:
  if (process.client) require('js-cookie').set(AUTH_TOKEN, token);

  // ...
}

export async function onLogout(apolloClient) {
  // Replace localStorage line by this:
  if (process.client) require('js-cookie').remove(AUTH_TOKEN);

  // ...
}
```

If you want authentication works properly on server side just add this following code to `neue.config.js`

```js
const cookies = require('koa-cookie');

module.exports = {
  ssr: {
    server(app) {
      app.use(cookies());
    },
  },
};
```
