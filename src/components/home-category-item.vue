<template>
    <div class="menu-item" @click="OnClickItem">
        <div class="menu-item__title">
            <p>{{CurrentProductCategory.title()}}</p>
        </div>
        <div class="menu-item__img">
            <div class="img-back">
                <img :src="'https://yaposhka64.ru' + CurrentProductCategory.image()" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProductCategory from "@/struct/ProductCategory";
    import DataRepository from "@/repositories/data-repository";

    @Component
    export default class HomeCategoryItemComponent extends Vue {
        public readonly name: string = "home-category-item-component"
        @Prop({default: '', required: true}) readonly ProductID!: string
        public CurrentProductCategory?: ProductCategory

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("home-category-item-component - started")
            this.CurrentProductCategory = DataRepository.CurrentProductBase?.ListCategories.get(Number(this.ProductID))
        }

        // </editor-fold>

        private OnClickItem(env: Event) {
            env.preventDefault()
            location.hash = '#/category/' + this.CurrentProductCategory?.id()
            console.log('Click => "home-category-item-component"')
        }
    }
</script>
