import {Request, Response} from 'express';
import accountsService from '../domain/services/accountsService';

export async function getAll(req: Request, res:Response){
    const userId: string = <string>req.body.token.userId;
    const accounts = await accountsService.listAccounts(userId);
    res.status(200).json(accounts);
}