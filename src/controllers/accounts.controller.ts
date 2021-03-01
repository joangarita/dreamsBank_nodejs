import {Request, Response} from 'express';
import {findAll} from '../model/accounts.model';

export async function getAll(req: Request, res:Response){
    const userId: string = <string>req.body.token.userId;
    const accounts = await findAll(userId);
    res.status(200).json(accounts);
}