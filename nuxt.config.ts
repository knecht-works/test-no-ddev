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
        { name: 'robots', content: 'noindex,follow' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://knecht.works/styleguide/kit.css' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      script: [
        { src: 'https://knecht.works/styleguide/kit.js', defer: true },
      ],
    },
  },
})
