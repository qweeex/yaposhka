<template>
    <div id="about-page" class="about-layout">
        <header-toolbar BackURL="/home"></header-toolbar>
        <div class="about-layout__wrapper">
            <div class="about-logo">
                <img src="assets/img/logo.png" alt="">
            </div>
            <div class="about-date">
                <p>© 2020 ООО “Япошка”</p>
            </div>
            <div class="about-list">
                <a href="#" @click="(env) => OnClickLink(env, 'http://google.com')" class="about-link">Политика конфиденциальности</a>
                <a href="#" @click="(env) => OnClickLink(env, 'http://google.com')" class="about-link">Лицензионное соглашение</a>
                <a href="#" @click="(env) => OnClickLink(env, 'http://google.com')" class="about-link">Стать партнером</a>
            </div>
            <div class="about-dev">
                <img src="assets/img/dev.png" alt="">
            </div>
        </div>
        <main-menu></main-menu>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HeaderToolbar from "@/components/header-toolbar.vue";
    import MainMenu from "@/components/main-menu.vue";
    import UIRepository from "@/repositories/ui-repository";

    @Component({
        components: {MainMenu, HeaderToolbar}
    })
    export default class AboutPage extends Vue {
        public readonly name: string = "about-page"

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            //
        }

        private mounted() {
            UIRepository.OnMountedPage()
            document.body.classList.add('body-fill')
            document.getElementById('header-toolbar-component')?.classList.add('catalog-layout__header-dark');
        }

        private beforeDestroy() {
            document.body.classList.remove('body-fill')
        }

        // </editor-fold>

        private OnClickLink(env: Event, url: string): void {
            env.preventDefault()
            UIRepository.DoOpenRemoteLink(url)
        }
    }
</script>
