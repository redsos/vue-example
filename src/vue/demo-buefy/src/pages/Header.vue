<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <div>
          <h1 class="title">
            SES.Target
          </h1>
        </div>

        <div class="level">
          <div class="level-left">
            <h2 class="subtitle">
              Public email delivery service
            </h2>
          </div>

          <div class="level-right">
            <b-dropdown>
              <button class="button" slot="trigger">
                <span>Account, admin</span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item>Logout</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<style scoped>
.hero.is-primary .button {
  color: rgba(17, 17, 17, 0.5);
}
</style>
