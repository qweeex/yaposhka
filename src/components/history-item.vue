<template>
    <div class="item">
        <div class="item-text" @click="OnClickFroItem">
            <p class="text-title">Заказ №{{CurrentOrder.orderID}}</p>
            <p class="text-price">{{CurrentOrder.sum}} ₽</p>
        </div>
        <div class="item-reload">
            <a href="#" @click="OnClickFroReuse" class="item-reload__btn">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11.5" cy="11.5" r="11.15" stroke="#292F4C" stroke-width="0.7" />
                    <path d="M13.553 8.18193L10.9733 10.1517C10.8379 10.2548 10.8079 10.454 10.9064 10.5959C10.9655 10.6818 11.0579 10.727 11.1518 10.727C11.2136 10.727 11.2758 10.7069 11.3297 10.6662L15 7.86376L11.3297 5.06097C11.1939 4.95757 11.0045 4.98875 10.9067 5.13129C10.8082 5.27319 10.8379 5.47237 10.9736 5.57546L13.553 7.54558H9.93939C7.76727 7.54558 6 9.40117 6 11.6818C6 11.8578 6.13545 12 6.30303 12C6.47061 12 6.60606 11.8578 6.60606 11.6818C6.60606 9.75211 8.10152 8.18193 9.93939 8.18193H13.553Z"
                          fill="#292F4C" />
                    <path d="M17.697 11C17.5294 11 17.3939 11.1422 17.3939 11.3182C17.3939 13.248 15.8985 14.8182 14.0606 14.8182H10.447L13.0267 12.8483C13.1621 12.7452 13.1921 12.546 13.0936 12.4041C12.9955 12.2619 12.8061 12.2304 12.6706 12.3338L9 15.1364L12.6703 17.9392C12.7242 17.9803 12.7864 18 12.8482 18C12.9421 18 13.0342 17.9545 13.0936 17.8689C13.1921 17.727 13.1624 17.5278 13.0267 17.4247L10.447 15.4545H14.0606C16.2327 15.4545 18 13.5989 18 11.3182C18 11.1422 17.8645 11 17.697 11Z"
                          fill="#292F4C" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import HistoryOrder from "@/struct/HistoryOrder";
    import DataRepository from "@/repositories/data-repository";

    @Component
    export default class HistoryItemComponent extends Vue {
        public readonly name: string = "history-item-component"
        @Prop({default: ''}) readonly OrderID!: string
        public CurrentOrder?: HistoryOrder

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("history-item-component - started")
            this.CurrentOrder = DataRepository.CurrentHistoryBase.ListOrders.get(Number(this.OrderID))
        }

        // </editor-fold>

        private OnClickFroItem(env: Event) {
            env.preventDefault();
            (this.$parent as any).DoOpenHistory(this.CurrentOrder?.orderID)
        }

        private OnClickFroReuse(env: Event) {
            env.preventDefault();
            DataRepository.CurrentCartBase.ClearCart()
            if (this.CurrentOrder !== undefined) {
                for (const product of this.CurrentOrder?.items)
                {
                    DataRepository.CurrentCartBase.SetCountProductInCart(product.productID, product.count)
                }
            }
            this.$router.push('/cart')
        }
    }
</script>
