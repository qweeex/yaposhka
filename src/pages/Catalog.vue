<template>
    <div id="catalog-page" class="catalog-layout">
        <div :class="'catalog-bg hidden' + (HasOpenFilter ? ' catalog-bg__show' : '')" @click="OnClickOpenFilter"></div>
        <header-toolbar Title="" BackURL="/home"></header-toolbar>
        <div class="catalog-layout__list">
            <div class="list-img">
                <img :src="'https://yaposhka64.ru' + this.CurrentCategory.image()" alt="">
            </div>
            <div class="list-title">
                <p>{{this.CurrentCategory.title()}}</p>
            </div>
            <div class="list-filter">
                <p @click="OnClickOpenFilter" v-if="CurrentFilter === 0">хиты</p>
                <p @click="OnClickOpenFilter" v-if="CurrentFilter === 1">новинки</p>
                <p @click="OnClickOpenFilter" v-if="CurrentFilter === 2">₽ - ₽₽</p>
                <p @click="OnClickOpenFilter" v-if="CurrentFilter === 3">₽₽ - ₽</p>
                <ul :class="'list-filter__info' + (HasOpenFilter ? ' list-filter__show' : '')">
                    <li @click="OnClickNewFilter(0)" v-if="CurrentFilter !== 0">хиты</li>
                    <li @click="OnClickNewFilter(1)" v-if="CurrentFilter !== 1">новинки</li>
                    <li @click="OnClickNewFilter(2)" v-if="CurrentFilter !== 2">₽ - ₽₽</li>
                    <li @click="OnClickNewFilter(3)" v-if="CurrentFilter !== 3">₽₽ - ₽</li>
                </ul>
            </div>
            <div class="product-list">
                <category-product-item v-for="(item) in this.GetProducts()" :key="item.id()" :ProductID="item.id()"></category-product-item>
            </div>
        </div>
        <main-menu></main-menu>
        <div v-if="HasPopupProduct() === true">
            <category-product-popup :ProductID="PopupProduct.id()"></category-product-popup>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HeaderToolbar from "@/components/header-toolbar.vue";
    import MainMenu from "@/components/main-menu.vue";
    import CategoryProductItem from "@/components/category-product-item.vue";
    import CategoryProductPopup from "@/components/category-product-popup.vue";
    import UIRepository from "@/repositories/ui-repository";
    import ProductItem from "@/struct/ProductItem";
    import ProductCategory from "@/struct/ProductCategory";
    import DataRepository from "@/repositories/data-repository";

    @Component({
        components: {CategoryProductPopup, CategoryProductItem, MainMenu, HeaderToolbar}
    })
    export default class CatalogPage extends Vue {
        public readonly name: string = "catalog-page"
        public HasOpenFilter: boolean = false
        public CurrentFilter: number = 0

        public CurrentCategory?: ProductCategory
        public PopupProduct?: ProductItem

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("catalog - started")
            this.CurrentCategory = DataRepository.CurrentProductBase?.ListCategories.get(Number(this.$root.$route.params.category_id))
            if (this.CurrentCategory === undefined) {
                location.hash = '#/home'
                return
            }
        }

        private mounted() {
            UIRepository.OnMountedPage()
            document.body.classList.add('body-fill')
            window.scrollTo(0, 0)
            window.addEventListener('scroll', () => this.OnWindowScroll())
        }

        private beforeDestroy() {
            document.body.classList.remove('body-fill')
            window.removeEventListener('scroll', () => this.OnWindowScroll())
        }

        // </editor-fold>

        private GetProducts(): ProductItem[] {
            const items: ProductItem[] = this.CurrentCategory?.ListProducts ?? []
            items.sort((a: ProductItem, b: ProductItem): number => {
                switch (this.CurrentFilter) {
                    case 0:
                        if (a.popular() === true && b.popular() !== true) {
                            return -1
                        } else if (a.popular() !== true && b.popular() === true) {
                            return 1
                        }
                        break
                    case 1:
                        if (a.new() === true && b.new() !== true) {
                            return -1
                        } else if (a.new() !== true && b.new() === true) {
                            return 1
                        }
                        break
                    case 2:
                        if (a.price() < b.price()) {
                            return -1
                        } else if (a.price() > b.price()) {
                            return 1
                        }
                        break
                    case 3:
                        if (a.price() > b.price()) {
                            return -1
                        } else if (a.price() < b.price()) {
                            return 1
                        }
                        break
                }
                return 0
            })
            return items
        }

        private OnWindowScroll(): void {
            const catalogList = (document.querySelector('.catalog-layout__list')?.getBoundingClientRect().top ?? 0) + document.body.scrollTop;
            const header = document.getElementById('header-toolbar-component');
            const filter = document.querySelector('.list-filter');

            if (catalogList <= 40) {
                header?.classList.add('catalog-layout__header-dark');
            } else {
                header?.classList.remove('catalog-layout__header-dark');
            }

            if (catalogList <= 0) {
                filter?.classList.add('list-filter__active');
                header?.classList.add('header-backs');
            } else {
                filter?.classList.remove('list-filter__active');
                header?.classList.remove('header-backs');
            }
            if (catalogList <= -81) {
                header?.classList.add('catalog-layout__header-fill');
            } else {
                header?.classList.remove('catalog-layout__header-fill');
            }
        }

        private OnClickOpenFilter(): void {
            this.HasOpenFilter = this.HasOpenFilter === false
        }

        private OnClickNewFilter(clickedFilter: number): void {
            this.CurrentFilter = clickedFilter
            this.HasOpenFilter = false
            this.$forceUpdate()
        }

        public ShowChildProduct(productID: string): void {
            this.PopupProduct = DataRepository.CurrentProductBase?.ListProducts.get(Number(productID))
            this.$forceUpdate()
        }

        private HasPopupProduct(): boolean {
            return this.PopupProduct !== undefined
        }
    }
</script>
