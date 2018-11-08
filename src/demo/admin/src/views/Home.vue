<template>
  <div class="home">
    <v-header></v-header>
    <v-main></v-main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from "./Header.vue";
import VFooter from "./Footer.vue";
import VMain from "./Main.vue";

export default {
  name: "home",
  components: {
    VHeader,
    VMain,
    VFooter
  }
};
</script>
