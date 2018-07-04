# Vue CLI plugins

Here are some tips to use some other Vue CLI plugins with VueNeue

:::warning
Work in progress !

I'll try to make this plugins compatible without any code change on your side
:::

## PWA

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

## Apollo

:::warning
Hard workaround
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

4.  Comment `localStorage` lines in `src/vue-apollo.js`

## TypeScript

Add `noImplicitAny` to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "noImplicitAny": false
  }
}
```

### Vue class components

A small helper exists in `src/vueclass.ts` to use Vue class components:

```js
import { Vue, Component } from '@/vueclass';

@Component({
  head: {
    title: 'Some page',
  },
})
export class SomePage extends Vue {
  async asyncData() {
    return {
      foo: 'bar',
    };
  }
}
```

:::tip
You can use decorators from:

- vue-class-component
- vue-property-decorator
- vuex-class

:::

## Vue i18n

TODO
