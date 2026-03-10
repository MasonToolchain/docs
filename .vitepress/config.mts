import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs/',
  title: "Mason",
  description: "Vue3 中后台管理模板",
  head: [['link', { rel: 'icon', href: '/docs/assets/svg/favicon.svg' }]],
  themeConfig: {
    logo: '/docs/assets/svg/favicon.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/basic-template' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '基础模板', link: '/guide/basic-template' },
          { text: 'CLI 工具', link: '/guide/cli' },
          { text: 'Server 开发', link: '/guide/server' },
          { text: 'Web 开发', link: '/guide/web' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZRMYDYCG/Mason' }
    ]
  }
})
