# Helpers

## Redirect function

### `$redirect(location, statusCode = 301)`

A simple function to redirect to a specific page that works on client and server side:

```js
export default {
  async asyncData({ redirect }) {
    redirect({ to: '' }, 302);
  },

  methods: {
    onClick() {
      this.$redirect({ to: '/some-path' });
    },
  },
};
```

:::tip

- The first argument can be a `location` like in [`router.go()` method](https://router.vuejs.org/guide/essentials/navigation.html#router-push-location-oncomplete-onabort)
- The second argument is the HTTP status code (301 by default)

:::

:::tip

Main `app` object will emit a `router.redirect` event when you call this function.

```js
// In a plugin source code
export default async ({ app }) {
  app.$on('router.redirect', () => {
    // Do an action on redirect
  });
}
```

:::

## Error function

### `$error(error, statusCode = 500)`

A simple function to display an error page:

```js
export default {
  async asyncData({ error }) {
    error(new Error(`I'm a teapot`), 418);
  },

  methods: {
    triggerError() {
      this.$error(new Error(`I'm a teapot`), 418);
    },
  },
};
```

:::tip

- First argument is an object or a string
- Second argument is the HTTP status code (500 by default)
  :::

:::tip
It's a shortcut to `this.$context.error()` inside your components.
:::

## Vue class components

A small helper exists to help you use Vue class components:

**JavaScript version**

```js
import { Component, Prop, Vue } from 'neueclass';

@Component({
  head: {
    title: 'Some page',
  },
})
export class SomePage extends Vue {
  @Prop({ type: String })
  message;

  async asyncData() {
    return {
      foo: 'bar',
    };
  }
}
```

**TypeScript version**

```js
import { Component, Prop, Vue } from 'neuets';

@Component({
  head: {
    title: 'Some page',
  },
})
export class SomePage extends Vue {
  @Prop({ type: String })
  message;

  async asyncData() {
    return {
      foo: 'bar',
    };
  }
}
```

See: [TypeScript plugin tips](/guide/cli-plugins.html#typescript)

:::tip
You can use decorators from:

- [vue-class-component](https://github.com/vuejs/vue-class-component)
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [vuex-class](https://github.com/ktsn/vuex-class)

:::
