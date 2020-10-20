<template>
    <div class="slide-item">
        <img :src="SlideImage" alt="">
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import UIRepository from "@/repositories/ui-repository";

    @Component
    export default class HomeSlideItemComponent extends Vue {
        public readonly name: string = "home-slide-item-component"
        @Prop({default: '', required: true}) readonly SlideID!: string
        @Prop({default: '', required: true}) readonly SlideImage!: string

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private mounted(): void {
            console.log("home-slide-item-component - mounted")
            UIRepository.OnChangeSlideCount()
        }

        // </editor-fold>

        private OnClickItem(env: Event) {
            env.preventDefault()
            location.hash = '#/category/' + this.SlideID
        }
    }
</script>
