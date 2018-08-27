<template>
  <div>
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/pages/Header.vue";
import Main from "@/pages/Main.vue";
import Footer from "@/pages/Footer.vue";

export default {
  name: "ses",
  components: {
    Header,
    Main,
    Footer
  }
};
</script>

<style lang="scss">
// Import Bulma's core
// @import "~bulma/sass/utilities/_all";

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>