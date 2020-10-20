import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import App from './App.vue'
import router from './data/router'
import DataRepository from "@/repositories/data-repository";
import {Route} from "vue-router";
import UIRepository from "@/repositories/ui-repository";

Vue.use(Vue2TouchEvents)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    created() {
        DataRepository.DoInitDetails()
    },
    watch: {
        '$route': {
            handler: UIRepository.OnLocationChanged,
            immediate: true
        }
    }
}).$mount('#app')
