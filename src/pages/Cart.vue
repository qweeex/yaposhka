<template>
    <div id="cart-page" class="cart-layout">
        <header-toolbar Title="Корзина" BackURL="/home"></header-toolbar>
        <main-menu></main-menu>
        <div class="cart-layout__product" v-if="GetCartItemsCount() !== 0">
            <div class="product-row">
                <div class="product-add">
                    <a href="#/home" class="product-add__btn">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9554 12.45H8.32342V11.47H10.9554V8.796H12.0054V11.47H14.6794V12.45H12.0054V15.152H10.9554V12.45Z" fill="#909090" />
                            <circle cx="11.5" cy="11.5" r="11.15" stroke="#909090" stroke-width="0.7" />
                        </svg>
                    </a>
                </div>
                <cart-product-item v-for="(item) in GetCartItems()" :key="item.ProductID" :ProductID="item.ProductID"></cart-product-item>
                <div class="product-clear">
                    <a href="#" @click="DoClearCart" class="product-clear__btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11.65" stroke="#909090" stroke-width="0.7" />
                            <path d="M12.1652 12.5011L9.06675 15.6212C8.98067 15.7079 8.98067 15.8483 9.06675 15.935C9.10973 15.9784 9.16617 16 9.2225 16C9.27894 16 9.33527 15.9784 9.37826 15.935L12.5001 12.7914L15.6218 15.935C15.6649 15.9784 15.7213 16 15.7776 16C15.8339 16 15.8904 15.9784 15.9334 15.935C16.0194 15.8483 16.0194 15.7079 15.9334 15.6212L12.835 12.5011L15.9354 9.37873C16.0215 9.29205 16.0215 9.15161 15.9354 9.06493C15.8494 8.97836 15.7099 8.97836 15.6239 9.06493L12.5002 12.2107L9.37607 9.06504C9.28999 8.97847 9.15064 8.97847 9.06456 9.06504C8.97848 9.15172 8.97848 9.29216 9.06456 9.37884L12.1652 12.5011Z"
                                  fill="#909090" stroke="#909090" stroke-width="0.3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <!-- Поля формы  -->
        <div class="cart-layout__form" v-if="GetCartItemsCount() > 0">
            <div class="form-tabs">
                <div class="tabs-item">
                    <label for="type1">
                        <input type="radio" id="type1" checked name="delivery-type" value="2" v-model="FormValues.delivery">
                        <span>Доставка</span>
                    </label>
                </div>
                <div class="tabs-item">
                    <label for="type2">
                        <input type="radio" id="type2" name="delivery-type" value="1" v-model="FormValues.delivery">
                        <span>Самовывоз</span>
                    </label>
                </div>
            </div>
            <div class="form-inputs">
                <div class="input">
                    <input type="text" placeholder="имя получателя" class="input-text" v-model="FormValues.name">
                </div>
                <div class="input">
                    <input type="text" placeholder="email(не обязательно)" class="input-text" v-model="FormValues.email">
                </div>
                <div class="input">
                    <input type="text" placeholder="телефон" class="input-text" v-model="FormValues.phone">
                </div>
                <div class="input">
                    <label for="pay" @click="OnToggleChangeMethodPay">
                        Оплата: {{(FormValues.method === '1' ? 'Наличными' : 'Другое')}}
                        <input id="pay" type="hidden" name="pay" value="1" v-model="FormValues.method">
                    </label>
                </div>
                <div class="input office-cart">
                    <label for="pay" @click="OnToggleChangeOffice">
                        Ресторан: {{FormValues.office}}
                    </label>
                </div>
                <div class="input">
                    <input type="text" placeholder="город и улица" class="input-text" v-model="FormValues.street">
                </div>
                <div class="input">
                    <input type="text" placeholder="номер дома" class="input-text" v-model="FormValues.building">
                </div>
                <div class="input">
                    <input type="text" placeholder="номер квартиры" class="input-text" v-model="FormValues.room">
                </div>
                <div class="input">
                    <input type="text" placeholder="этаж" class="input-text" v-model="FormValues.floor">
                </div>
                <div class="input">
                    <input type="text" placeholder="колличество персон" class="input-text" v-model="FormValues.persons">
                </div>
                <div class="input">
                    <textarea placeholder="комментарий" class="input-textarea" v-model="FormValues.desc"></textarea>
                </div>
            </div>
        </div>
        <!-- Информация если корзина пустая -->
        <div class="cart-empty" v-if="GetCartItemsCount() === 0">
            <div class="empty">
                <div class="empty-text">
                    <span>Ваша корзина пуста</span>
                </div>
            </div>
        </div>
        <div :class="'cart-layout__total ' + (HasChangeMethodPay === true && HasFinishMessage === false && HasRequest === false ? 'total-hide' : '')" v-if="GetCartItemsCount() !== 0">
            <div class="total-price">
                <p><span>{{GetCartFullSum()}}</span> ₽</p>
            </div>
            <div class="total-submit">
                <button @click="OnSubmitForm" class="submit-btn">Оформить заказ</button>
            </div>
        </div>
        <div :class="'cart-layout__pay ' + (HasChangeMethodPay === false && HasFinishMessage === false ? 'total-hide' : '')">
            <div class="pay-title">
                <p>Оплата</p>
            </div>
            <div class="pay-types">
                <ul>
                    <li><a href="#" @click="(env) => OnClickMethodPay(env, '1')" class="pay-item">Наличными</a></li>
                    <!--<li><a href="#" @click="(env) => OnClickMethodPay(env, '2')" class="pay-item">Картой при получении</a></li>-->
                </ul>
            </div>
        </div>
        <div :class="'cart-layout__pay ' + (HasChangeOffice === false ? 'total-hide' : '')">
            <div class="pay-title">
                <p>Рестораны</p>
            </div>
            <div class="pay-types">
                <ul>
                    <li v-for="(item) in GetAddrList()" :key="item.address"><a href="#" @click="(env) => OnClickOffice(env, item.address)" class="pay-item">{{item.address}}</a></li>
                </ul>
            </div>
        </div>
        <div :class="'cart-layout__pay ' + (HasFinishMessage === false ? 'total-hide' : '')">
            <div class="pay-title">
                <p>Ваш заказ #{{OrderNumber}}</p>
            </div>
            <div class="pay-finish">
                Наш менеджер свяжится с вами ближайшее время для уточнения деталей.
            </div>
        </div>
        <div v-if="MessagePopup.length !== 0">
            <div class="bg-popup" @click="OnClickPopupBackground"></div>
            <div class="window-popup">
                <p>
                    {{MessagePopup}}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .cart-empty {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cart-empty .empty-text span{
        font-weight: bold;
        font-size: 21px;
        color: #373d58;
    }
</style>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UIRepository from "@/repositories/ui-repository";
    import HeaderToolbar from "@/components/header-toolbar.vue";
    import MainMenu from "@/components/main-menu.vue";
    import CartProductItem from "@/components/cart-product-item.vue";
    import DataRepository from "@/repositories/data-repository";
    import ProductInCart from "@/struct/ProductInCart";
    import Axios from "axios";
    import qs from "qs";
    import AddOrderRequestBody from "@/struct/AddOrderRequestBody";
    import HistoryOrder from "@/struct/HistoryOrder";
    import AddrItem from "@/struct/AddrItem";

    @Component({
        components: {CartProductItem, MainMenu, HeaderToolbar}
    })
    export default class CartPage extends Vue {
        public readonly name: string = "cart-page"
        public HasChangeMethodPay: boolean = false
        public HasChangeOffice: boolean = false
        public HasFinishMessage: boolean = false
        public HasRequest: boolean = false
        public OrderNumber: number = 0;
        public MessagePopup: string = ""

        public FormValues: {
            name: string;
            email: string;
            phone: string;
            street: string;
            building: string;
            room: string;
            floor: string;
            persons: string;
            method: string;
            delivery: string;
            desc: string;
            office: string;
        } = {
            name: "",
            email: "",
            phone: "",
            method: "1",
            delivery: '2',
            desc: "",
            building: "",
            persons: "",
            room: "",
            street: "",
            floor: "",
            office: ""
        }


        // <editor-fold defaultstate="collapsed" desc="Vue Hooks">
        private created(): void {
            console.log("cart - started")
        }

        private mounted(): void {
            this.FormValues.office = this.GetAddrList()[0].address

            UIRepository.OnMountedPage()
            document.getElementById('header-toolbar-component')?.classList.add('catalog-layout__header-dark');
            document.getElementById('header-toolbar-component')?.classList.add('white-mode');
        }

        // </editor-fold>

        private OnToggleChangeMethodPay(): void {
            this.HasChangeOffice = false
            this.HasChangeMethodPay = this.HasChangeMethodPay === false
        }

        private OnToggleChangeOffice(): void {
            this.HasChangeMethodPay = false
            this.HasChangeOffice = this.HasChangeOffice === false
        }

        private OnClickMethodPay(env: Event, method: string) {
            env.preventDefault()
            this.HasChangeMethodPay = false
            this.FormValues.method = method
        }

        private OnClickOffice(env: Event, office: string) {
            env.preventDefault()
            this.HasChangeOffice = false
            this.FormValues.office = office
        }

        private GetSubmitRequestBody(): AddOrderRequestBody {
            const body: AddOrderRequestBody = {
                receiver: this.FormValues.name,
                email: this.FormValues.email,
                phone: this.FormValues.phone,
                street: this.FormValues.street,
                building: this.FormValues.building,
                room: this.FormValues.room,
                comment: this.FormValues.desc,
                properties: {
                    extfld_persons: this.FormValues.persons,
                    extfld_summ: String(DataRepository.CurrentCartBase.GetFullSum()),
                    extfld_floor: this.FormValues.floor,
                    extfld_address: this.FormValues.office
                },
                delivery: Number(this.FormValues.delivery),
                payment: Number(this.FormValues.method),
                products: []
            }

            const itemsInCart = this.GetCartItems()
            for (const item of itemsInCart) {
                body.products?.push({
                    id: String(item.ProductID),
                    count: String(item.Count),
                })
            }
            return body
        }

        private OnClickPopupBackground(): void {
            this.MessagePopup = ""
        }

        private GetAddrList(): AddrItem[] {
            return DataRepository.CurrentAddrArray
        }

        private OnSubmitForm(): void {
            if (this.FormValues.name.length === 0) {
                this.MessagePopup = "Вы не заполнили поле - имя"
                return
            }
            if (this.FormValues.phone.length === 0) {
                this.MessagePopup = "Вы не заполнили поле - телефон"
                return
            }
            if (this.FormValues.street.length === 0) {
                this.MessagePopup = "Вы не заполнили поле - улица"
                return
            }
            if (this.FormValues.building.length === 0) {
                this.MessagePopup = "Вы не заполнили поле - номер дома"
                return
            }

            const body: AddOrderRequestBody = this.GetSubmitRequestBody()
            this.HasRequest = true
            Axios.post('https://yaposhka64.ru/api/addOrder.json', qs.stringify(body), {
                headers: {
                    "CheckMobileApp": "true",
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                const resp: any = res.data
                if (resp.success === true) {
                    this.OrderNumber = resp.data.msorder
                    this.HasFinishMessage = true
                    this.SaveInHistory()
                } else {
                    this.MessagePopup = "Получен неожиданный ответ от сервера"
                }
            }).catch(() => {
                this.MessagePopup = "Во время запроса до сервера - произошла ошибка"
            }).finally(() => {
                this.DoClearCart()
            })
        }

        private SaveInHistory() {
            const historyOrder: HistoryOrder = {
                sum: DataRepository.CurrentCartBase.GetFullSum(),
                orderID: this.OrderNumber,
                date: Date.now(),
                items: []
            }
            const products: ProductInCart[] = this.GetCartItems()
            for (const productInCart of products) {
                historyOrder.items.push({
                    count: productInCart.Count,
                    productID: productInCart.ProductID
                })
            }
            DataRepository.CurrentHistoryBase.AddNewOrder(historyOrder)
        }

        private DoClearCart(): void {
            DataRepository.CurrentCartBase.ClearCart()
        }

        private GetCartFullSum(): number {
            return DataRepository.CurrentCartBase.GetFullSum()
        }

        private GetCartItems(): ProductInCart[] {
            const productItems: ProductInCart[] = []

            const itemsInCart: IterableIterator<ProductInCart> = DataRepository.CurrentCartBase.ListItems.values()
            for (const item of itemsInCart) {
                productItems.push(item)
            }
            return productItems
        }

        private GetCartItemsCount(): number {
            return DataRepository.CurrentCartBase.GetCountInCart()
        }
    }
</script>
