<template>
    <div class="product-item">
        <div class="product-item__close">
            <a href="#" @click="OnClickRemoveCartItem" class="close-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#F4F5F8" />
                    <g clip-path="url(#clip0)">
                        <path d="M11.5223 11.9664L7.09608 16.3926C6.97312 16.5156 6.97312 16.7148 7.09608 16.8378C7.15749 16.8994 7.23812 16.93 7.31858 16.93C7.39921 16.93 7.47968 16.8994 7.54108 16.8378L12.0006 12.3783L16.4601 16.8378C16.5217 16.8994 16.6022 16.93 16.6826 16.93C16.7631 16.93 16.8437 16.8994 16.9051 16.8378C17.0281 16.7148 17.0281 16.5156 16.9051 16.3926L12.4791 11.9664L16.9081 7.53702C17.0311 7.41405 17.0311 7.21483 16.9081 7.09187C16.7851 6.96905 16.5859 6.96905 16.4631 7.09187L12.0008 11.5545L7.53796 7.09202C7.41499 6.96921 7.21593 6.96921 7.09296 7.09202C6.96999 7.21499 6.96999 7.41421 7.09296 7.53718L11.5223 11.9664Z"
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
        <div class="product-item__img">
            <img :src="'http://yaposhka64.ru' + CurrentProductInCart.Product().image()" alt="">
        </div>
        <div class="product-item__info">
            <div class="info">
                <p class="title">{{CurrentProductInCart.Product().title()}}</p>
                <p class="price">{{CurrentProductInCart.Product().price()}} ₽</p>
            </div>
            <div class="count">
                <span>
                    {{CurrentProductInCart.Count}}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductInCart from "@/struct/ProductInCart";
    import DataRepository from "@/repositories/data-repository";

    @Component
    export default class CartProductItemComponent extends Vue {
        public readonly name: string = "cart-product-item-component"
        @Prop({default: ''}) readonly ProductID!: string
        public CurrentProductInCart?: ProductInCart


        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("cart-product-item-component - started")
            this.CurrentProductInCart = DataRepository.CurrentCartBase.ListItems.get(Number(this.ProductID))
        }

        // </editor-fold>

        private OnClickRemoveCartItem(env: Event): void {
            env.preventDefault()
            DataRepository.CurrentCartBase.SetCountProductInCart((this.CurrentProductInCart?.ProductID ?? 0), 0)
        }
    }
</script>
