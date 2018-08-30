<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/pages/Header.vue'
import Footer from '@/pages/Footer.vue'

export default {
  name: 'ses',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
// Import Bulma's core
// @import "~bulma/sass/utilities/_all";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
