<template>
    <div id="home-page">
        <div class="main-layout">
            <div class="main-layout__slider" v-touch:swipe.left="OnSwipeSlider" v-touch:swipe.right="OnSwipeSlider">
                <div class="slider-wrapper">
                    <div class="slider-items" :style="'left: -' + (CurrentSlide * GetWidthDevice()) + 'px'">
                        <home-slide-item
                            v-for="(item) in GetSaleArray()"
                            :SlideImage="item.mainSlide"
                            :SlideID="item.mainSlide"
                            :key="item.mainSlide"></home-slide-item>
                    </div>
                  <div class="slider-thumb">
                    <span v-for="(item, index) in GetArrayFromSlideCount()" :key="index" :class="'slider-thumb__item' + (index === CurrentSlide ? ' item-active' : '')"></span>
                  </div>
                </div>
            </div>
            <div class="main-layout__menu">
                <div class="menu-wrapper">
                    <home-category-item v-for="(item) in GetProductCategories()" :key="item.id()" :ProductID="item.id()"></home-category-item>
                </div>
            </div>
            <home-footer-toolbar></home-footer-toolbar>
            <main-menu></main-menu>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator"
    import HomeFooterToolbar from "@/components/home-footer-toolbar.vue";
    import MainMenu from "@/components/main-menu.vue";
    import HomeCategoryItem from "@/components/home-category-item.vue";
    import HomeSlideItem from "@/components/home-slide-item.vue";
    import UIRepository from "@/repositories/ui-repository";
    import ProductCategory from "@/struct/ProductCategory";
    import DataRepository from "@/repositories/data-repository";
    import SaleItem from "@/struct/SaleItem";


    @Component({
        components: {HomeSlideItem, HomeCategoryItem, MainMenu, HomeFooterToolbar}
    })
    export default class HomePage extends Vue {
        public readonly name: string = "home-page"
        public CurrentSlide: number = 0

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            //
        }

        private mounted() {
            document.body.classList.add('body-fill')
            UIRepository.OnMountedPage()
        }

        private beforeDestroy() {
            document.body.classList.remove('body-fill')
        }

        // </editor-fold>

        private OnSwipeSlider(direction: any) {
            if (direction === 'left') {
                if (this.CurrentSlide < UIRepository.SlideItemsCount - 1) {
                    this.CurrentSlide = this.CurrentSlide + 1
                }
            } else if (direction === 'right') {
                if (this.CurrentSlide > 0) {
                    this.CurrentSlide = this.CurrentSlide - 1
                }
            }
            this.$forceUpdate()
        }

        private GetArrayFromSlideCount(): boolean[] {
            const arr: boolean[] = []
            for (let index = 0; index < UIRepository.SlideItemsCount; index++) {
                arr.push(true)
            }
            return arr
        }

        private GetSaleArray(): SaleItem[] {
          return DataRepository.CurrentSaleArray;
        }

        private GetWidthDevice(): number{
          return screen.width;
        }

        private GetProductCategories(): ProductCategory[] | undefined {
            const productCategoryArray: ProductCategory[] = []
            const productCategory: IterableIterator<ProductCategory> | undefined = DataRepository.CurrentProductBase?.ListCategories.values()
            if (productCategory !== undefined) {
                for(const category of productCategory) {
                    productCategoryArray.push(category)
                }
            }
            return productCategoryArray
        }
    }
</script>
