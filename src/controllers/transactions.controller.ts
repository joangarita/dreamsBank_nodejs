import {Request, Response} from 'express';
import {findAllByAccount, findById,findAverage} from '../model/transactions.model';

export async function getAllByAccount(req: Request, res:Response){
    const accountId:string = <string>req.query.accountId;
    const transactions = await findAllByAccount(accountId);
    res.status(200).json(transactions);
}

export async function getTransactionDetail(req: Request, res:Response){
    const transactionId:string = <string>req.params.id;
    const transactions = await findById(transactionId);
    res.status(200).json(transactions);
}

export async function getAverageAmount(req: Request, res:Response){
    const accountId:string = <string>req.query.accountId;
    const dateStart: string = <string>req.query.dateStart;
    const dateEnd: string = <string>req.query.dateEnd;
    const transactions = await findAverage(accountId,dateStart,dateEnd);
    res.status(200).json(transactions);
}