<template>
  <section class="section">
    <div class="container">
      <b-message title="Danger" type="is-danger" v-model="c" :active="c.active" :closable="false">
        {{ c.message }}
      </b-message>
    </div>
  </section>
</template>

<script>
export default {
  name: 'oauth2',
  data () {
    return {
      c: {
        active: false,
        message: ''
      }
    }
  },
  created () {
    let o = this
    this.$auth.callback(function (status, data) {
      if (status) {
        o.$router.push('/');
        return
      }

      o.c.active = true
      o.c.message = data.errMsg
    })
  }
}
</script>
