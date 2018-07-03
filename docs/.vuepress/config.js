module.exports = {
  title: 'VueNeue',
  base: '/docs/',
  description: 'Vue CLI and Server Side Rendering',
  themeConfig: {
    sidebar: {
      '/guide/': ['', 'ssr', 'server', 'cli-plugins'],
      '/reference/': ['', 'process', 'helpers'],
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Reference',
        link: '/reference/',
      },
      {
        text: 'Github',
        link: 'https://github.com/vueneue/vueneue',
      },
    ],
  },
};
