<template>
    <div class="block-item">
        <div class="item-title">
            <p>{{Addr}}</p>
        </div>
        <!--<div class="item-map" @click="OnClickInMap">
            <p>На карте</p>
        </div>-->
        <div class="item-phone">
            <a :href="'tel:' + Phone">
                <svg fill="none" height="23" viewBox="0 0 23 23" width="23" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11.5" cy="11.5" r="11.15" stroke="#292F4C" stroke-width="0.7" />
                    <path d="M7.0046 6.91009L6.91502 7.02441C6.76751 7.21262 6.64251 7.4319 6.54888 7.67036C6.46133 7.90148 6.40855 8.11718 6.38449 8.33014L6.3842 8.33277C6.16686 10.1345 6.9673 11.8289 9.3845 14.2461C12.6322 17.4936 15.2166 17.2584 15.3033 17.2497C15.5278 17.2226 15.7429 17.169 15.9636 17.0834C16.2 16.991 16.4197 16.866 16.6083 16.7184L16.698 16.6482L17.1015 16.2531C17.3423 16.0105 17.3361 15.6402 17.1243 15.4274C17.1242 15.4274 17.1241 15.4273 17.124 15.4272L15.3284 13.6314C15.3284 13.6313 15.3283 13.6313 15.3282 13.6312C15.1153 13.4193 14.7443 13.4137 14.5023 13.6557L14.5022 13.6558L13.5971 14.5607L13.4111 14.7467L13.1807 14.6197C13.123 14.5879 13.0633 14.5547 13.0006 14.5195L13.0005 14.5194C12.4244 14.2002 11.606 13.7467 10.7466 12.8868C10.7466 12.8868 10.7466 12.8867 10.7465 12.8867M7.0046 6.91009L9.41817 10.4617C9.73567 11.0333 10.17 11.8153 10.9941 12.6393L10.7465 12.8867M7.0046 6.91009L7.37953 6.53301C7.37964 6.5329 7.37974 6.5328 7.37984 6.5327C7.62275 6.29005 7.99355 6.29661 8.20519 6.50815C8.20521 6.50817 8.20522 6.50818 8.20524 6.5082L10.0016 8.30492L7.0046 6.91009ZM10.7465 12.8867C9.88782 12.0281 9.43411 11.2112 9.11432 10.6354L9.1104 10.6284L9.11011 10.6278C9.10522 10.619 9.1004 10.6103 9.09564 10.6017C9.06714 10.5501 9.04101 10.5028 9.01517 10.4576L8.88236 10.2253L9.07171 10.0362L9.67882 9.43005M10.7465 12.8867L9.67882 9.43005M9.67882 9.43005L9.92646 9.67738L9.67916 9.42971L9.97746 9.13104L9.97758 9.13092C10.2201 8.8883 10.2138 8.5176 10.0017 8.30504L9.67882 9.43005Z"
                          stroke="#292F4C" stroke-width="0.7" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class ContectLineItemComponent extends Vue {
        public readonly name: string = "contact-line-item-component"
        @Prop({default: 'ул. Волоха, 5'}) readonly Addr!: string
        @Prop({default: ''}) readonly InMap!: string
        @Prop({default: '8(8453) 717-717'}) readonly Phone!: string
        public CurrentCountInCart: number = 0

        private OnClickInMap() {
            (this.$parent as any).SetAddr(this.InMap, this.Phone)
        }

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("contact-line-item-component - started")
        }

        // </editor-fold>
    }
</script>
