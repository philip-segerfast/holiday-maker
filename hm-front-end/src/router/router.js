import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import ResultPage from "../views/ResultPage.vue";
import HotelView from "@/views/HotelView.vue";
import NewHotelCardTestView from "@/views/HotelCardTestView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/result-page",
    name: "Result",
    component: ResultPage,
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/hotelView",
    name: "Hotel",
    component: HotelView,
  },
  {
    path: "/hotelView/:id",
    component: HotelView,
  },
  {
    path: "/newHotelCard",
    component: NewHotelCardTestView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
