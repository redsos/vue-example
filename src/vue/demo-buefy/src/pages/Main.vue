<template>
  <section class="section">
    <div class="container">
      <hr>

      <div class="columns">
        <!-- left menu -->
        <div class="column is-one-fifth">
          <Menu>
            <p class="menu-label">General</p>
            <ul class="menu-list">
              <li>
                <a class="is-active">Dashboard</a>
              </li>
            </ul>
          </Menu>
        </div>

        <!-- right area -->
        <Area/>
      </div>

    </div>
  </section>
</template>

<script>
import Menu from "@/components/menu/Menu.vue";
import Area from "@/pages/AreaForMain.vue";

export default {
  name: "ses-main",
  components: {
    Menu,
    Area
  }
};
</script>
