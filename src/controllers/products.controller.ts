import {Request, Response} from 'express';
import { saveProductRequest } from '../model/products.model';

export async function createProductRequest(req: Request, res:Response){
    const userId: string = <string>req.body.token.userId;
    const productId: string = <string>req.body.productId;
    const request = await saveProductRequest(productId, userId);
    res.status(200).json({trackingNumber: request.insertId});
}