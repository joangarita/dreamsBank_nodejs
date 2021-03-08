import {Request, Response} from 'express';
import productsService from '../domain/services/productsService';

export async function createProductRequest(req: Request, res:Response){
    const userId: string = <string>req.body.token.userId;
    const productId: string = <string>req.body.productId;
    const request = await productsService.requestProduct(productId, userId);
    res.status(200).json(request);
}