import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);

const Home = () => import("views/home/Home");
const Cart = () => import("views/cart/Cart");
const Category = () => import("views/category/Category");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");

export default new vueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/detail/:iid",
      component: Detail
    },
    {
      path: "/category",
      component: Category
    },
    {
      path: "/cart",
      component: Cart
    },

    {
      path: "/profile",
      component: Profile
    }
  ],
  mode: "history"
});
