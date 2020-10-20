<template>
    <div class="product-item">
        <div class="item-img" @click="OnClickProductItem">
            <div class="item-tag" v-if="CurrentProduct.hasAnyTag()">
                <img v-if="CurrentProduct.popular()" src="assets/img/fire.svg" class="tag-fire" alt="">
                <img v-if="CurrentProduct.new()" src="assets/img/new.svg" class="tag-new" alt="">
                <img v-if="CurrentProduct.favorite()" src="assets/img/star.svg" class="tag-star" alt="">
            </div>
            <img :src="'https://yaposhka64.ru' + CurrentProduct.image()" alt="">
        </div>
        <div class="item-info" @click="OnClickProductItem">
            <p class="title">{{CurrentProduct.title()}}</p>
            <p class="desc">{{CurrentProduct.description()}}</p>
            <p class="price">{{CurrentProduct.price()}} ₽</p>
        </div>
        <div class="item-count item-count__fill">
            <span @click="OnClickChangeCurrentCount(-1)" class="count-minus">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1753 12.71H9.8293V11.66H13.1753V12.71Z" fill="#909090" />
                    <circle cx="11.5" cy="11.5" r="11.15" stroke="#909090" stroke-width="0.7" />
                </svg>
            </span>
            <span class="count">{{GetCurrentCountInCart()}}</span>
            <span @click="OnClickChangeCurrentCount(1)" class="count-plus">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9554 12.45H8.32342V11.47H10.9554V8.796H12.0054V11.47H14.6794V12.45H12.0054V15.152H10.9554V12.45Z" fill="#909090" />
                    <circle cx="11.5" cy="11.5" r="11.15" stroke="#909090" stroke-width="0.7" />
                </svg>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductItem from "@/struct/ProductItem";
    import DataRepository from "@/repositories/data-repository";

    @Component
    export default class CategoryProductItemComponent extends Vue {
        public readonly name: string = "category-product-item-component"
        @Prop({default: '0'}) readonly ProductID!: string
        public CurrentCountInCart: number = 0
        public CurrentProduct?: ProductItem

        private OnClickChangeCurrentCount(velocity: number) {
            if ((this.CurrentCountInCart > 0 && velocity < 0) || velocity > 0) {
                this.CurrentCountInCart += velocity
            }
            DataRepository.CurrentCartBase.SetCountProductInCart(Number(this.ProductID), this.CurrentCountInCart)
        }

        private OnClickProductItem(event: Event): void {
            event.preventDefault();
            (this.$parent as any).ShowChildProduct(String(this.CurrentProduct?.id()))
        }

        private GetCurrentCountInCart(): number {
            this.CurrentCountInCart = DataRepository.CurrentCartBase.GetCountProductInCart(Number(this.ProductID))
            return this.CurrentCountInCart
        }

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("category-product-item-component - started")
            this.CurrentProduct = DataRepository.CurrentProductBase?.ListProducts.get(Number(this.ProductID))
        }

        // </editor-fold>
    }
</script>
