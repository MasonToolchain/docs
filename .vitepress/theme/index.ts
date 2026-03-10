// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import PhotoAlbum from './components/PhotoAlbum.vue'
import LandingPage from './components/LandingPage.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('PhotoAlbum', PhotoAlbum)
    app.component('LandingPage', LandingPage)
  }
} satisfies Theme
