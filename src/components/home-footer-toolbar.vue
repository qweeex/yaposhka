<template>
    <div id="home-footer-toolbar-component" class="main-layout__toolbar">
        <div class="toolbar-wrapper">
            <div class="menu-item">
                <a href="#" class="item-link menu__btn" @click="OnClickToolbarOpenMenu">
                    <img src="assets/img/menu.svg" alt="">
                </a>
            </div>
            <div class="menu-item">
                <router-link to="/sale" class="item-link">
                    <img src="assets/img/sale.svg" alt="">
                </router-link>
            </div>
            <div class="card-item">
                <router-link to="/cart" class="item-link">
                    <img src="assets/img/cart.svg" alt="">
                    <span class="count">{{GetCountFromCart()}}</span>
                </router-link>
            </div>
            <div class="menu-item">
                <router-link to="/contact" class="item-link">
                    <img src="assets/img/phone.svg" alt="">
                </router-link>
            </div>
            <div class="menu-item">
                <router-link to="/history" class="item-link">
                    <img src="assets/img/rest.svg" alt="">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UIRepository from "@/repositories/ui-repository";
    import DataRepository from "@/repositories/data-repository";

    @Component
    export default class HomeFooterToolbarComponent extends Vue {
        public readonly name: string = "home-footer-toolbar-component"

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("home-footer-toolbar-component - started")
            UIRepository.CurrentToolBar = this
        }

        // </editor-fold>

        private OnClickToolbarOpenMenu(env: Event): void {
            env.preventDefault()
            UIRepository.OnMainMenuToggle()
        }

        private GetCountFromCart(): number {
            return DataRepository.CurrentCartBase.GetCountInCart()
        }
    }
</script>
