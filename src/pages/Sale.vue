<template>
    <div id="sale-page" class="sale-layout">
        <header-toolbar Title="Акции" BackURL="/home" HasDark="" MasterClass="header-def"></header-toolbar>
        <div class="sale-fixed">
          <div class="sale-layout__wrapper">
            <div class="wrap-item" v-for="(item) in GetSaleArray()" :key="item.stockSlide">
              <img :src="item.stockSlide" alt="">
            </div>
          </div>
        </div>
        <main-menu></main-menu>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UIRepository from "@/repositories/ui-repository";
    import HeaderToolbar from "@/components/header-toolbar.vue";
    import MainMenu from "@/components/main-menu.vue";
    import SaleItem from "@/struct/SaleItem";
    import DataRepository from "@/repositories/data-repository";

    @Component({
        components: {MainMenu, HeaderToolbar}
    })
    export default class SalePage extends Vue {
        public readonly name: string = "sale-page"

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("sale - started")
        }

        private mounted(): void {
            UIRepository.OnMountedPage()
            document.body.classList.add('body-fill');
            (document.querySelector('html') as HTMLHtmlElement).addEventListener('scroll', () => {
              (document.querySelector('#header-toolbar-component') as HTMLDivElement).classList.remove('.catalog-layout__header-dark');
              (document.querySelector('#header-toolbar-component') as HTMLDivElement).classList.remove('.header-backs');
              console.log('Delete class sale-wrapper')
            });
            (document.querySelector('#app') as HTMLDivElement).addEventListener('scroll', () => {
              (document.querySelector('#header-toolbar-component') as HTMLDivElement).classList.remove('.catalog-layout__header-dark');
              (document.querySelector('#header-toolbar-component') as HTMLDivElement).classList.remove('.header-backs');
              console.log('Delete class sale-layout')
            });
        }

        private beforeDestroy() {
            document.body.classList.remove('body-fill')
        }

        // </editor-fold>

        private GetSaleArray(): SaleItem[] {
            return DataRepository.CurrentSaleArray;
        }
    }
</script>
