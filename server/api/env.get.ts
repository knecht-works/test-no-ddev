// Environment info for the demo page, collected on the server so the preview
// shows what actually runs inside Knecht's container.
export default defineEventHandler((event) => {
  const { nuxtVersion } = useRuntimeConfig(event)

  return {
    host: getRequestHost(event, { xForwardedHost: true }),
    node: process.version,
    nuxt: nuxtVersion,
    packageManager: process.env.npm_config_user_agent ?? '(unset)',
    previewUrl: process.env.KNECHT_PREVIEW_URL ?? '(unset)',
    serverTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
  }
})
