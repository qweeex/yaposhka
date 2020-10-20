import GetDetailsResponse from "@/struct/GetDetailsResponse";
import ProductCategory from "@/struct/ProductCategory";
import ProductItem from "@/struct/ProductItem";

class ProductBase {
    public DetailsResponse?: GetDetailsResponse;

    public readonly ListCategories: Map<number, ProductCategory> = new Map<number, ProductCategory>()
    public readonly ListProducts: Map<number, ProductItem> = new Map<number, ProductItem>()

    public Export(): GetDetailsResponse {
        if (this.DetailsResponse !== undefined) {
            return this.DetailsResponse
        }

        return {
            categories: [],
            products: []
        }
    }

    public Import(detailsResponse: GetDetailsResponse): ProductBase {
        this.DetailsResponse = detailsResponse

        for(const category of this.DetailsResponse.categories) {
            this.ListCategories.set(category.id, new ProductCategory(category))
        }

        for(const item of this.DetailsResponse.products) {
            const product: ProductItem = new ProductItem(item)

            product.ParentCategory = this.ListCategories.get(product.Details.category_id)
            product.ParentCategory?.ListProducts.push(product)

            this.ListProducts.set(item.id, product)
        }

        return this
    }
}

export default ProductBase