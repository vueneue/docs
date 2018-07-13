# Helpers

## $redirect()

`TODO`

## $error()

`TODO`

## Vue class components

A small helper exists in `src/vueclass.js` to use Vue class components:

```js
import { Component, Prop, Vue } from '@/vueclass';

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

:::tip
You can use decorators from:

- [vue-class-component](https://github.com/vuejs/vue-class-component)
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [vuex-class](https://github.com/ktsn/vuex-class)

:::
