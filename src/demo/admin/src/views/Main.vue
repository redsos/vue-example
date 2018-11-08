<template>
  <div class="main">
    <div>
      left main
      <ul>
        <li>
          <router-link to="/">Go to navigation</router-link>
        </li>
        <li>
          <router-link to="/n1">Go to navigation one</router-link>
        </li>
        <li>
          <router-link to="/n2">Go to navigation two</router-link>
        </li>
      </ul>
    </div>
    <div>
      right main
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "main",
  components: {}
};
</script>
