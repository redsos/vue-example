import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Navigation from "./views/Navigation.vue";
import Navigation1 from "./views/Navigation1.vue";
import Navigation2 from "./views/Navigation2.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "",
          component: Navigation
        },
        {
          path: "n2",
          component: Navigation2
        },
        {
          path: "n1",
          component: Navigation1
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
