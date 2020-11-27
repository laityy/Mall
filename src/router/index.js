import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter)

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')

export default new vueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/cart',
            component: Cart
        },
        {
            path: '/category',
            component: Category
        },
        {
            path: '/profile',
            component: Profile
        }
    ],
    mode: 'history'
})
