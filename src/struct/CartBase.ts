import ProductInCart from "@/struct/ProductInCart";
import ProductCartInCache from "@/struct/ProductCartInCache";
import UIRepository from "@/repositories/ui-repository";

class CartBase {
    public ListItems: Map<number, ProductInCart> = new Map<number, ProductInCart>()

    public constructor() {
        this.DoLoadCartFromCache()
    }

    public GetCountProductInCart(productID: number): number {
        const productInCart: ProductInCart | undefined = this.ListItems.get(productID)
        return productInCart?.Count ?? 0
    }

    public SetCountProductInCart(productID: number, newCount: number): void {
        const productInCart: ProductInCart | undefined = this.ListItems.get(productID)
        if (newCount <= 0) {
            if (productInCart !== undefined) {
                this.ListItems.delete(productID)
            }
        } else {
            if (productInCart === undefined) {
                this.ListItems.set(productID, new ProductInCart(productID, newCount))
            } else {
                productInCart.Count = newCount
            }
        }
        this.OnCartItemsChanged()
    }

    public GetSumFromProductInCart(productID: number): number {
        const productInCart: ProductInCart | undefined = this.ListItems.get(productID)
        return ((productInCart?.Count ?? 0) * (productInCart?.Product()?.price() ?? 0))
    }

    public ClearCart(): void {
        this.ListItems.clear()
        this.OnCartItemsChanged()
    }

    public GetFullSum(): number {
        let sum = 0;
        const itemsValues = this.ListItems.values()
        for (const item of itemsValues) {
            sum += (item.Count * (item.Product()?.price() ?? 0))
        }
        return sum
    }

    public GetCountInCart(): number {
        return this.ListItems.size
    }

    private OnCartItemsChanged(): void {
        this.DoSaveCartInCache()
        UIRepository.OnChangedData()
    }

    private DoLoadCartFromCache(): void {
        const contentInCatch: string | null = localStorage.getItem('cartItems')
        if (contentInCatch !== null) {
            const itemsInCache: ProductCartInCache[] = JSON.parse(contentInCatch)
            for (const item of itemsInCache) {
                this.ListItems.set(item.productID, new ProductInCart(item.productID, item.count))
            }
        }
    }

    private DoSaveCartInCache(): void {
        const itemsValues = this.ListItems.values()
        const itemsArray: ProductCartInCache[] = []
        for (const item of itemsValues) {
            itemsArray.push({productID: item.ProductID, count: item.Count})
        }
        localStorage.setItem('cartItems', JSON.stringify(itemsArray))
    }
}

export default CartBase