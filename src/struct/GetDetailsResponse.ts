import ResponseCategory from "@/struct/ResponseCategory";
import ResponseItem from "@/struct/ResponseItem";

interface GetDetailsResponse {
    categories: ResponseCategory[];
    products: ResponseItem[];
}

export default GetDetailsResponse