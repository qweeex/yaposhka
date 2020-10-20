import HistoryOrder from "@/struct/HistoryOrder";

class HistoryBase {
    public ListOrders: Map<number, HistoryOrder> = new Map<number, HistoryOrder>()

    public constructor() {
        this.LoadOrders()
    }

    public AddNewOrder(order: HistoryOrder): void {
        this.ListOrders.set(order.orderID, order)
        this.SaveOrders()
    }

    public SaveOrders(): void {
        const ordersArray: HistoryOrder[] = []
        const orders: IterableIterator<HistoryOrder> = this.ListOrders.values()
        for (const order of orders) {
            ordersArray.push(order)
        }
        localStorage.setItem('ordersHistory', JSON.stringify(ordersArray))
    }

    public LoadOrders(): void {
        const ordersContent = localStorage.getItem('ordersHistory')
        if (ordersContent !== null) {
            const ordersArray: HistoryOrder[] = JSON.parse(ordersContent)
            for(const order of ordersArray) {
                this.ListOrders.set(order.orderID, order)
            }
        }
    }
}

export default HistoryBase