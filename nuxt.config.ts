import { createRequire } from 'node:module'

const { version: nuxtVersion } = createRequire(import.meta.url)('nuxt/package.json')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  runtimeConfig: {
    // Server-only: read in server/api/env.get.ts
    nuxtVersion,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      bodyAttrs: { class: 'kit-body kit-light' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-title', content: 'Knecht' },
        { name: 'robots', content: 'noindex,follow' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://knecht.works/styleguide/kit.css' },
        { rel: 'icon', type: 'image/png', href: 'https://knecht.works/styleguide/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: 'https://knecht.works/styleguide/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: 'https://knecht.works/styleguide/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://knecht.works/styleguide/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: 'https://knecht.works/styleguide/favicon/site.webmanifest' },
      ],
      script: [
        { src: 'https://knecht.works/styleguide/kit.js', defer: true },
      ],
    },
  },
})
