<template>
    <div id="history-page" class="history-layout">
        <header-toolbar Title="История заказов" BackURL="/home"></header-toolbar>
        <div class="history-layout__img">
            <img src="assets/img/history.png" alt="">
        </div>
        <div class="history-layout__list">
            <div class="list-wrapper">
                <history-item v-for="(order) in GetOrdersList()" :key="order.orderID" :OrderID="order.orderID"></history-item>
            </div>
        </div>
        <main-menu></main-menu>
        <div class="history-layout__popup" v-if="HasOpenHistoryItem() === true">
            <div class="popup-wrapper">
                <div class="popup-header">
                    <div class="popup-header__close">
                        <a href="#" @click="OnClickCloseOpenedHistory" class="popup-close__btn">
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
                <div class="popup-content">
                    <div class="content-info">
                        <p class="info-number">Заказ № {{OpenHistoryItem.orderID}}</p>
                        <p class="info-date">{{String(OpenHistoryItem.date) | toDate}}</p>
                    </div>
                    <div class="content-price">
                        <p>{{OpenHistoryItem.sum}} ₽</p>
                    </div>
                </div>
                <div class="popup-order">
                    <div class="product-item" v-for="(product) in OpenHistoryProducts" :key="product.ProductID">
                        <div class="item-img">
                            <div class="item-count">
                                {{product.Count}}
                            </div>
                            <img :src="'http://yaposhka64.ru' + product.Product().image()" alt="">
                        </div>
                        <div class="item-info">
                            <p class="title">{{product.Product().title()}}</p>
                            <p class="desc">{{product.Product().description()}}</p>
                            <p class="price">{{product.Product().price()}} ₽</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .click-block {
        position: fixed;
        width: 50px;
        height: 50px;
        background-color: black;
        border: 2px solid white;
        z-index: 100;
    }
</style>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator"
    import UIRepository from "@/repositories/ui-repository";
    import HeaderToolbar from "@/components/header-toolbar.vue";
    import MainMenu from "@/components/main-menu.vue";
    import HistoryItem from "@/components/history-item.vue";
    import HistoryOrder from "@/struct/HistoryOrder";
    import DataRepository from "@/repositories/data-repository";
    import ProductInCart from "@/struct/ProductInCart";

    @Component({
        components: {HistoryItem, MainMenu, HeaderToolbar},
        filters: {
            toDate(value: string) {
                const date: Date = new Date(Number(value))
                const month: string = String(((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1))
                const day: string = String((date.getDate() > 9 ? '' : '0') + date.getDate())
                return `${day}.${month}.${date.getFullYear()}`
            }
        }
    })
    export default class HistoryPage extends Vue {
        public readonly name: string = "history-page"
        private OpenHistoryItem?: HistoryOrder
        private OpenHistoryProducts: ProductInCart[] = []


        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            //
        }

        private mounted() {
            UIRepository.OnMountedPage()
            document.getElementById('header-toolbar-component')?.classList.add('catalog-layout__header-dark');
            document.getElementById('header-toolbar-component')?.classList.add('white-mode');
        }

        // </editor-fold>

        private HasOpenHistoryItem(): boolean {
            return (this.OpenHistoryItem !== undefined)
        }

        public DoOpenHistory(orderID: number): void {
            this.OpenHistoryItem = DataRepository.CurrentHistoryBase.ListOrders.get(orderID)
            this.OpenHistoryProducts = []
            if (this.OpenHistoryItem !== undefined) {
                for (const historyItem of this.OpenHistoryItem?.items) {
                    this.OpenHistoryProducts.push(new ProductInCart(historyItem.productID, historyItem.count))
                }
            }
            this.$forceUpdate()
        }

        private OnClickCloseOpenedHistory(env: Event): void {
            env.preventDefault()
            this.OpenHistoryItem = undefined
            this.$forceUpdate()
        }

        private GetOrdersList(): HistoryOrder[] {
            const historyOrderArray: HistoryOrder[] = []
            const orders: IterableIterator<HistoryOrder> = DataRepository.CurrentHistoryBase.ListOrders.values()
            for (const order of orders) {
                historyOrderArray.push(order)
            }
            historyOrderArray.sort((a: HistoryOrder, b: HistoryOrder) => {
                if (a.orderID < b.orderID) {
                    return 1
                }
                return ((a.orderID > b.orderID) ? -1 : 0)
            })
            return historyOrderArray
        }
    }
</script>
