# Process variables

Thanks to Webpack and his DefinePlugin, this starter inject some useful variables in your
project ton handle some conditions based on build or environment context.

List of defined variables :

- `process.dev` Return `true` in development mode, `false` otherwise
- `process.test` Is `true` if in test environment
- `process.prod` Return `true` in production mode, `false` otherwise
- `process.spa` Return `true` in SPA mode, `false` in SSR mode
- `process.ssr` Return `true` in SSR mode, `false` in SPA mode
- `process.client` In SSR mode only: return `true` if in client rendering, `false` if in server side rendering
- `process.server` In SSR mode only: return `true` if in server side rendering, `false` otherwise

If you want to init a library only on client side:

```js
if (process.client) {
  // your code...
}
```
