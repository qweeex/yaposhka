<template>
    <div id="header-toolbar-component" :class="(HasDark === '1' ? 'dark-mode' : '') + ' ' + MasterClass" >
        <div class="header-back">
            <a href="#" @click="OnClickBackButton" class="header-back__btn">

            </a>
        </div>
        <div class="header-title">
            <p>{{Title}}</p>
        </div>
        <div class="header-cart">
            <router-link to="/cart" class="header-cart__btn">

                <span class="cart-count">{{GetCountFromCart()}}</span>
            </router-link>
        </div>
        <div class="header-menu">
            <a class="header-menu__btn" href="#" @click="OnClickToolbarOpenMenu">

            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import UIRepository from "@/repositories/ui-repository";
    import "@/assets/style/common-header-tool.less"
    import DataRepository from "@/repositories/data-repository";

    @Component
    export default class HeaderToolbarComponent extends Vue {
        public readonly name: string = "header-toolbar-component"
        @Prop({default: ''}) readonly Title!: string
        @Prop({default: '/home'}) readonly BackURL!: string
        @Prop({default: '0'}) readonly HasDark!: string
        @Prop({default: ''}) readonly MasterClass!: string

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("header-toolbar-component - started")
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

        private OnClickBackButton(env: Event): void {
            env.preventDefault()
            UIRepository.DoBackLocation()
        }
    }
</script>
