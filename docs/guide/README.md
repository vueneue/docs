# Introduction

Welcome to VueNeue project documentation !

## Getting started

**Install**

```bash
vue add @vueneue/ssr
```

:::warning
At the moment, this plugin will heavly overwrite some base files:

- `src/App.vue`
- `src/main.js`
- `src/router.js`
- `src/store.js`

So, before install this plugin, please commit your current changes
:::

This plugins add 3 commands to run or build your application in SSR mode:

**Start a development server with HMR**

```bash
npm run ssr:serve
```

**Build for production**

```bash
npm run ssr:build
```

**Start in production mode** (need a `npm run ssr:build` before)

```bash
npm run ssr:start
```

:::tip
The `serve` and `build` are still available to run your application in SPA mode
:::
