import { ProductRequest } from "../entity/products/productRequest.entity";

export interface ProductsRepository{
    requestProduct(productId:string, userId: string):Promise<ProductRequest>;
}