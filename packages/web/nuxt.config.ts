// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src/',
  telemetry: true,
  routeRules: {
    '/**': {
      headers: {
        'Content-Security-Policy': "frame-ancestors 'self'; frame-src 'self';",
        'X-Frame-Options': 'SAMEORIGIN',
        'Cross-Origin-Opener-Policy': 'same-origin'
      }
    },
    '/sandbox/worker.js': {
      headers: {
        'service-worker-allowed': '/'
      }
    },
    '/sandbox/preview.html': {
      headers: {
        'Content-Security-Policy': '',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      }
    }
  }
})
