// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt'],
  components: true,
  runtimeConfig: {
    public: {
      SERVER_URL: process.env.SERVER_URL || 'http://10.0.1.18:8008',
    },
  },
});
