import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import BootstrapPage from "@/pages/Bootstrap.vue";
import HomePage from "@/pages/Home.vue";
import CatalogPage from "@/pages/Catalog.vue";
import CartPage from "@/pages/Cart.vue";
import AboutPage from "@/pages/About.vue";
import ContactPage from "@/pages/Contact.vue";
import DeliveryPage from "@/pages/Delivery.vue";
import SalePage from "@/pages/Sale.vue";
import HistoryPage from "@/pages/History.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'BootstrapPage',
        component: BootstrapPage
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/category/:category_id',
        name: 'CatalogPage',
        component: CatalogPage
    },
    {
        path: '/cart',
        name: 'CartPage',
        component: CartPage
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage
    },
    {
        path: '/contact',
        name: 'ContactPage',
        component: ContactPage
    },
    {
        path: '/delivery',
        name: 'DeliveryPage',
        component: DeliveryPage
    },
    {
        path: '/sale',
        name: 'SalePage',
        component: SalePage
    },
    {
        path: '/history',
        name: 'HistoryPage',
        component: HistoryPage
    }
]

const router = new VueRouter({
    routes
})

export default router
