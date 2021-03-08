import { Product } from '../../domain/entity/products/product.entity';
import { ProductRequest } from '../../domain/entity/products/productRequest.entity';
import { ProductsRepository } from '../../domain/interfaces/productsRepository.interface';
import {connect} from '../database';


export class ProductsDao implements ProductsRepository{
    async requestProduct(productId:string, userId: string): Promise<ProductRequest> {
        const statusCode = 'PND'; // Default status upon creation of a request
        const conn = await connect();
        const saveRequest = await conn.query('INSERT INTO product_requests (product, status, requestor) VALUES (?, ?, ?)',
        [productId,statusCode, userId]);
        const requestId:string = JSON.parse(JSON.stringify(saveRequest[0])).insertId;
        const request = await conn.query('SELECT * FROM product_requests WHERE id = ?', [requestId]);
        const parsedJson = JSON.parse(JSON.stringify(request[0]))[0];
        return this.jsonToProductRequest(parsedJson);
    }

    jsonToProductRequest(json:any){
        return new ProductRequest(json.id,new Product(json.product, '---'),json.status,json.requestor,json.created_date);
    }
    
}