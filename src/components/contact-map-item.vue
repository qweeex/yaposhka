<template>
    <div class="block-map" id="contact-map-item">
        <div id="map" class="map"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class ContactMapItemComponent extends Vue {
        public readonly name: string = "contact-map-item-component"
        @Prop({default: '55.76, 37.64'}) readonly InMap!: string

        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("contact-map-item-component - started")
        }

        private mounted(): void {
            //
            const mapScript = document.createElement('script')
            mapScript.async = true
            mapScript.setAttribute('src', 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A131a8caf332607feb1623af34b7705e3be12df85d33270f7eb899d0ceb1302d3&width=100%25&height=400&lang=ru_RU&scroll=true&id=map&center=' + this.InMap)
            document.body.appendChild(mapScript)
        }

        // </editor-fold>

        private DoInitMap(): void {
            const center: number[] = []
            const splitedInMap: string[] = this.InMap.split(',')
            center.push(Number(splitedInMap[0].trim()))
            center.push(Number(splitedInMap[1].trim()))


            // const ymaps = (window as any).ymaps;
            // ymaps.ready(function() {
            //     const myMap = new ymaps.Map('map', {
            //         center: center,
            //         zoom: 15,
            //         controls: ['']
            //     });
            //
            //     const myPlacemark = new ymaps.Placemark(center);
            //     myMap.geoObjects.add(myPlacemark);
            // });

        }
    }
</script>
