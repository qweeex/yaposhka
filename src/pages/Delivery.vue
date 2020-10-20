<template>
    <div id="delivery-page" class="terms-layout">
        <header-toolbar HasDark="1" Title="Условия" BackURL="/home"></header-toolbar>
        <div class="terms-layout__wrapper">
            <div class="block">
                <p class="title">Доставка обедов в Энгельсе</p>
                <p class="desc">Предлагаем Вам попробовать японскую кухню в нашем суши-баре «Япошка». Наши повара не первый год занимаются приготовлением блюд, соблюдая все традиции и рецепты. На три порции роллов предусмотрен один бесплатный набор специй (подарочный ролл не учитывается).
                                Доставка по городу Энгельс осуществляется в кратчайшие сроки.</p>
            </div>
            <div class="block">
                <p class="title">Условия доставки суши и ролл в Энгельсе</p>
                <p class="desc">Для того, чтобы доставка суши, ролл, пиццы и разных обедов по Энгельсу была бесплатной, Вам необходимо оформить заказ не меньше, чем на 300 рублей.</p>
            </div>
            <hr>
            <div class="block">
                <p class="subtitle">Для определенных районов существуют следующие условия:</p>
                <ul>
                    <li>Пробуждение – 500 рублей</li>
                    <li>Пос. Коминтерн - 1 500 рублей</li>
                    <li>Пос. Анисовка - 1 500 рублей</li>
                    <li>Пос. Зеленый - 1 500 рублей</li>
                    <li>Плодсовхоз - 700 рублей</li>
                    <li>Новопушкинское - 1 500 рублей</li>
                    <li>Прибрежный - 1 000 рублей</li>
                    <li>Район Шумейка - 1 500 рублей</li>
                    <li>Мясокомбинат – 700 рублей</li>
                    <li>Турбазы - 700 рублей</li>
                </ul>
                <p class="desc">В случае недобора минимальной суммы заказа, разница оплачивается отдельно</p>
            </div>
        </div>
        <div class="terms-layout__footer">
            <div class="block">
                <p class="address">Время генерирования заказа с 11 до 23 (проспект Химиков, 1 – с 10 до 22)</p>
                <span></span>
                <p class="address">Время доставки с 11 до 23
                                   (проспект Химиков, 1 – с 10 до 22)</p>
                <span></span>
                <p class="address">Доставка реализуется по всем районам города Энгельса</p>
            </div>
            <hr>
            <div class="block">
                <p class="subtitle">Контейнеры оплачиваются отдельно!
                                    Большой — 10 р, Маленький — 5 р.</p>
                <p class="desc">
                    Мы приглашаем в наш суши-бар абсолютно всех! В кафе-суши-баре «Япошка» вы сможете весело скоротать свободное время с родными и близкими. Вы будете довольны качеством наших блюд, в противном случае Вы можете воспользоваться разделом «контроль качества» - позвонить или написать о своей проблеме.
                </p>
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
    export default class DeliveryPage extends Vue {
        public readonly name: string = "delivery-page"

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("delivery - started")
        }

        private mounted() {
            document.body.classList.add('body-fill')
            UIRepository.OnMountedPage()
        }

        private beforeDestroy() {
            document.body.classList.remove('body-fill')
        }

        // </editor-fold>
    }
</script>
