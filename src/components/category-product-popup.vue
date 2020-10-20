<template>
    <div class="catalog-layout__popup">
        <div class="popup-wrapper">
            <div class="popup-header">
                <div class="popup-header__tag" v-if="CurrentProduct.hasAnyTag()">
                    <img v-if="CurrentProduct.popular()" src="assets/img/fire.svg" class="tag-fire" alt="">
                    <img v-if="CurrentProduct.new()" src="assets/img/new.svg" class="tag-new" alt="">
                    <img v-if="CurrentProduct.favorite()" src="assets/img/star.svg" class="tag-star" alt="">
                </div>
                <div class="popup-header__close">
                    <a href="#" @click="OnClickClosePopup" class="popup-close__btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11.65" stroke="#292F4C" stroke-width="0.7" />
                            <g clip-path="url(#clip0)">
                                <path d="M11.5222 11.9664L7.09596 16.3926C6.97299 16.5156 6.97299 16.7148 7.09596 16.8378C7.15737 16.8994 7.23799 16.93 7.31846 16.93C7.39909 16.93 7.47956 16.8994 7.54096 16.8378L12.0005 12.3783L16.46 16.8378C16.5216 16.8994 16.6021 16.93 16.6825 16.93C16.763 16.93 16.8436 16.8994 16.905 16.8378C17.028 16.7148 17.028 16.5156 16.905 16.3926L12.4789 11.9664L16.908 7.53702C17.031 7.41405 17.031 7.21483 16.908 7.09187C16.785 6.96905 16.5858 6.96905 16.463 7.09187L12.0006 11.5545L7.53784 7.09202C7.41487 6.96921 7.21581 6.96921 7.09284 7.09202C6.96987 7.21499 6.96987 7.41421 7.09284 7.53718L11.5222 11.9664Z"
                                      fill="#292F4C" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect x="7" y="7" width="10" height="10" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="popup-image">
                <img :src="'http://yaposhka64.ru' + CurrentProduct.image()" alt="">
            </div>
            <div class="popup-info">
                <div class="info-name">
                    <p class="title">{{CurrentProduct.title()}}</p>
                    <div class="info-desc">
                        <p>116 ккал/100гр</p>
                        <p>{{CurrentProduct.weight()}} гр.</p>
                    </div>
                </div>
                <div class="info-price">
                    <p>{{CurrentProduct.price()}} ₽</p>
                </div>
            </div>
            <div class="popup-desc">
                <p>{{CurrentProduct.description()}}</p>
            </div>
            <div class="popup-footer">
                <div class="popup-count">
                    <span @click="OnClickChangeCurrentCount(-1)" class="count-minus">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="11.5" fill="#292F4C" />
                            <path d="M13.1753 12.71H9.8293V11.66H13.1753V12.71Z" fill="white" />
                        </svg>
                    </span>
                    <span class="count">{{CurrentCountInCart}}</span>
                    <span @click="OnClickChangeCurrentCount(1)" class="count-plus">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="11.5" fill="#292F4C" />
                            <path d="M10.9554 12.45H8.32342V11.47H10.9554V8.796H12.0054V11.47H14.6794V12.45H12.0054V15.152H10.9554V12.45Z" fill="white" />
                        </svg>
                    </span>
                </div>
                <div class="popup-add">
                    <button @click="OnClickAddToCart">Добваить в корзину</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductItem from "@/struct/ProductItem";
    import DataRepository from "@/repositories/data-repository";

    @Component
    export default class CategoryProductPopupComponent extends Vue {
        public readonly name: string = "category-product-popup-component"
        @Prop({default: '0'}) readonly ProductID!: string
        public CurrentCountInCart: number = 0
        public CurrentProduct?: ProductItem

        private OnClickChangeCurrentCount(velocity: number) {
            if ((this.CurrentCountInCart > 0 && velocity < 0) || velocity > 0) {
                this.CurrentCountInCart += velocity
            }
        }

        private OnClickAddToCart(): void {
            if (this.CurrentCountInCart === 0) {
                this.CurrentCountInCart += 1
            }
            DataRepository.CurrentCartBase.SetCountProductInCart(Number(this.ProductID), this.CurrentCountInCart);
            (this.$parent as any).ShowChildProduct(undefined)
        }

        private OnClickClosePopup(event: Event): void {
            event.preventDefault();
            (this.$parent as any).ShowChildProduct(undefined)
        }

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("category-product-popup-component - started")
            this.CurrentProduct = DataRepository.CurrentProductBase?.ListProducts.get(Number(this.ProductID))
            this.CurrentCountInCart = DataRepository.CurrentCartBase.GetCountProductInCart(Number(this.ProductID))
        }

        // </editor-fold>
    }
</script>
