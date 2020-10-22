<template>
    <div id="contact-page" class="contact-layout">
        <header-toolbar Title="Контакты" BackURL="/home" MasterClass="header-def"></header-toolbar>
        <div class="contact-layout__wrapper">
            <div class="block-phone" v-if="CurrentPhone !== undefined">
                <a :href="'tel:' + CurrentPhone">
                    {{CurrentPhone}}
                </a>
            </div>
            <div class="block-city">
                г. Энгельс
            </div>
            <div class="block-list">
                <div v-for="(item, index) in GetAddrList()" :key="index">
                    <contact-line-item :Addr="item.address.replace('г. Энгельс, ', '')" :Phone="item.phone" :InMap="item.maps"></contact-line-item>
                </div>
            </div>
            <contact-map-item v-if="CurrentInMap !== undefined" :InMap="CurrentInMap"></contact-map-item>
        </div>
        <main-menu></main-menu>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ContactLineItem from "@/components/contact-line-item.vue";
    import HeaderToolbar from "@/components/header-toolbar.vue";
    import MainMenu from "@/components/main-menu.vue";
    import ContactMapItem from "@/components/contact-map-item.vue";
    import UIRepository from "@/repositories/ui-repository";
    import AddrItem from "@/struct/AddrItem";
    import DataRepository from "@/repositories/data-repository";

    @Component({
        components: {ContactMapItem, MainMenu, HeaderToolbar, ContactLineItem}
    })
    export default class ContactPage extends Vue {
        public readonly name: string = "contact-page"
        public CurrentInMap: string | undefined = undefined
        public CurrentPhone: string | undefined = undefined

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("contact - started")
            this.CurrentPhone = undefined
            this.CurrentInMap = undefined
        }

        private mounted() {
            document.body.classList.add('body-fill')
            const firstAddr: AddrItem = this.GetAddrList()[0]
            this.SetAddr(firstAddr.maps, firstAddr.phone)
            UIRepository.OnMountedPage()
        }

        private beforeDestroy() {
            document.body.classList.remove('body-fill')
        }

        // </editor-fold>

        private GetAddrList(): AddrItem[] {
            return DataRepository.CurrentAddrArray
        }

        public SetAddr(inMap: string, phone: string): void {
            this.CurrentInMap = undefined
            this.CurrentPhone = undefined
            this.$forceUpdate()
            this.$nextTick(() => {
                this.CurrentInMap = inMap
                this.CurrentPhone = phone
                this.$forceUpdate()
            })
        }
    }
</script>
