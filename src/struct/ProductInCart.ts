import ProductItem from "@/struct/ProductItem";
import DataRepository from "@/repositories/data-repository";

class ProductInCart {
    public Count: number = 0
    public ProductID: number

    public Product(): ProductItem | undefined {
        return DataRepository.CurrentProductBase?.ListProducts.get(this.ProductID)
    }

    public constructor(productID: number, count: number = 1) {
        this.ProductID = productID
        this.Count = count
    }

}

export default ProductInCart