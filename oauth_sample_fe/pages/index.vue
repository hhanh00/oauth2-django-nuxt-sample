<template lang="pug">
  div
    b-button(v-if='!loggedIn' @click='login') Login
    template(v-else)
      b-button(@click='info') Get User Info
      b-button(@click='logout') Logout
    p {{ email }}
</template>

<script>
export default {
  auth: false,

  computed: {
    user() { return this.$auth.user },
    loggedIn() { return this.$auth.loggedIn }
  },
  watch: {
    loggedIn: {
      handler(v) {
        if (v) this.exchange_token()
      },
      immediate: true
    }
  },
  data() {
    return {
      username: '',
      email: ''
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith('google')
    },

    async logout() {
      const formData = new FormData()
      formData.append('client_id', process.env.APP_CLIENT_ID)
      const r = await this.$axios({
        url: '/auth/invalidate-sessions',
        method: 'POST',
        data: formData,
      })
      await this.$auth.logout()
    },

    async info() {
      const r = await this.$axios({
        url: '/core/user',
        method: 'GET'
      })
      this.email = r.data.email
    },

    async exchange_token() {
      const auth_token = this.$auth.getToken('google').substring(7)
      this.$axios.setToken(false)
      const formData = new FormData()
      formData.append('grant_type', 'convert_token')
      formData.append('client_id', process.env.APP_CLIENT_ID)
      formData.append('client_secret', process.env.APP_CLIENT_SECRET)
      formData.append('backend', 'google-oauth2')
      formData.append('token', auth_token)
      const r = await this.$axios({
        url: '/auth/convert-token',
        method: 'POST',
        data: formData,
      })
      const data = r.data
      const app_token = `${data.token_type} ${data.access_token}`
      this.$axios.setToken(app_token)
    }
  }
}
</script>
