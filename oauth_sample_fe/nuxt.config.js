require('dotenv').config()

export default {
  mode: 'universal',
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/buefy/dist/buefy.min.css'
      },
    ],
  },
  buildModules: [
    '@nuxtjs/dotenv',
  ],
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    'nuxt-buefy'
  ],

  auth: {
    strategies: {
      google: {
        client_id: process.env.CLIENT_ID
      }
    }
  },

  axios: {
    proxy: true,
    debug: true
  },

  proxy: {
    '/auth': 'http://localhost:8000/',
    '/core': 'http://localhost:8000/',
  },
}
