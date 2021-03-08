import { stat } from "fs";
import { Product } from "./product.entity";
import { ProductRequestStatus } from "./productRequestStatus.entity";

export class ProductRequest{
    id: string;
    product: Product;
    status: ProductRequestStatus;
    requestor: string;
    createdAt: string;
    constructor(
        id: string,
        product: Product,
        status: ProductRequestStatus,
        requestor: string,
        createdAt: string,
    ){
        this.id = id; 
        this.product = product;
        this.status = status;
        this.requestor = requestor;
        this.createdAt = createdAt;
    }
}