export default {
  components: true,
  head: {
    titleTemplate: "Mastering Nuxt: %s",
    htmlAttrs: {
      lang: "en"
    },
    bodyAttrs:{
      class: ["my-style"]
    },
    meta: [{
      charset: "utf-8",
    }]
  },
  router: {
    prefetchLinks: false,
  },
  plugins:[
    '~/plugins/maps.client',
    '~/plugins/dataApi',
    '~/plugins/auth.client',
  ],
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/sass/app.scss'],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
  publicRuntimeConfig: {
    auth:{
      cookieName: 'idToken',
      clientId: '909807157313-i081vvnve3tucclov9ekjnnc11nh2ht4.apps.googleusercontent.com',
    },
  },
}
