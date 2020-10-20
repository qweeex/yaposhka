import ResponseCategory from "@/struct/ResponseCategory";
import ProductItem from "@/struct/ProductItem";

class ProductCategory {
    public Details: ResponseCategory

    public ListProducts: ProductItem[] = []

    public constructor(responseCategory: ResponseCategory) {
        this.Details = responseCategory
    }

    public id(): number {
        return this.Details.id
    }

    public title(): string {
        return this.Details.title
    }

    public image(): string {
        if (this.ListProducts.length > 0) {
            return this.ListProducts[0].image()
        }
        return ""
    }
}

export default ProductCategory