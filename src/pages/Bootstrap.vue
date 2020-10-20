<template>
    <div id="bootstrap-page">
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import "@/assets/style/page-bootstrap.less"

    @Component
    export default class BootstrapPage extends Vue {
        public readonly name: string = "bootstrap-page"

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("boostrap - started")
            setTimeout(() => this.MoveToHome(), 1000)
        }

        private mounted() {
//
        }

        private destroy() {
//
        }

        // </editor-fold>

        private MoveToHome(): void {
            location.hash = '#/home'
        }
    }
</script>
