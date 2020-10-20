import ProductCartInCache from "@/struct/ProductCartInCache";

interface HistoryOrder {
    orderID: number,
    date: number,
    sum: number,
    items: ProductCartInCache[]
}

export default HistoryOrder