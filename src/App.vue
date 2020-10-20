<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    import "@/assets/style/common-reset.css"
    import "@/assets/fonts/stylesheet.css"
    import "@/assets/style/common.less"

    @Component
    export default class App extends Vue {
        public readonly name: string = "app"

        public created(): void {
            console.log("app - started");
            (window as any).vue = this.$root
        }
    }
</script>
