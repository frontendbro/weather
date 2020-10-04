import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import WeatherPage from "../views/WeatherPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "WeatherPage",
    component: WeatherPage,
  },
  {
    path: "/:name",
    name: "WeatherPage",
    component: WeatherPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
