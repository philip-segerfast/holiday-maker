import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import ResultPage from "../views/ResultPage.vue";
import HotelView from "@/views/HotelView.vue";
import AboutView from "../views/About.vue";
import LoginView from "../views/LoginView.vue";
import BookingView from "@/views/BookingView.vue";
import BookingDetailsView from "../views/BookingDetailsView.vue";
import SuccessfullPayment from "../views/SuccessfullPayment.vue";
import CancelledPayment from "../views/CancelledPayment.vue";

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
    component: AboutView,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/result-page",
    name: "Result",
    component: ResultPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/hotelView",
    name: "Hotel View",
    component: HotelView,
  },
  {
    path: "/hotelView/:id",
    name: "Hotel View",
    component: HotelView,
  },
  {
    path: "/bookingView",
    name: "Booking View",
    component: BookingView,
  },
  {
    path: "/bookingdetailsview/:id",
    component: BookingDetailsView,
  },
  {
    path: "/successfullpayment",
    name: "SuccessfullPayment",
    component: SuccessfullPayment,
  },
  {
    path: "/cancelledpayment",
    name: "CancelledPayment",
    component: CancelledPayment,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
