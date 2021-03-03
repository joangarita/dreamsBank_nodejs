import {connect} from '../database';

export async function saveProductRequest(productId: string, userId:string):Promise<any>{
    const statusCode = 'PND'; // Default staus upon creation of a request
    const conn = await connect();
    const request = await conn.query('INSERT INTO product_requests (product, status, requestor) VALUES (?, ?, ?)',
    [productId,statusCode, userId]);
    return request[0];
}