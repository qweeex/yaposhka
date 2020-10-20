import ResponseItem from "@/struct/ResponseItem";
import ProductCategory from "@/struct/ProductCategory";
import ParseUrl from "url-parse"

class ProductItem {
    public Details: ResponseItem

    public ParentCategory?: ProductCategory

    constructor(responseItem: ResponseItem) {
        this.Details = responseItem
    }

    public id(): number {
        return this.Details.id
    }

    public title(): string {
        return this.Details.title
    }

    public image(): string {
        return  ParseUrl(this.Details.image).pathname
    }

    public article(): string {
        return this.Details.article
    }

    public categoryId(): number {
        return this.Details.category_id
    }

    public description(): string {
        return this.Details.description
    }

    public favorite(): boolean {
        return this.Details.favorite === 1
    }

    public new(): boolean {
        return this.Details.new === 1
    }

    public popular(): boolean {
        return this.Details.popular === 1
    }

    public hasAnyTag(): boolean {
        return (this.favorite() === true || this.new() === true || this.popular() === true)
    }

    public price(): number {
        return this.Details.price
    }

    public oldPrice(): number {
        return this.Details.old_price
    }

    public weight(): number {
        return this.Details.weight
    }

    public category(): ProductCategory | undefined {
        return this.ParentCategory
    }
}

export default ProductItem