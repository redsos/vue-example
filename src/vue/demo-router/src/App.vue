<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <ul>
      <li>
        <router-link to="/">default</router-link>
      </li>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/main">Main</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
