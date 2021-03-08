import {Request, Response} from 'express';
import transactionsService from '../domain/services/transactionsService';

export async function getAllByAccount(req: Request, res:Response){
    const accountId:string = <string>req.query.accountId;
    const transactions = await transactionsService.listAllByAccount(accountId);
    res.status(200).json(transactions);
}

export async function getTransactionDetail(req: Request, res:Response){
    const transactionId:string = <string>req.params.id;
    const transactions = await transactionsService.getTransaction(transactionId);
    res.status(200).json(transactions);
}

export async function getAverageAmount(req: Request, res:Response){
    const accountId:string = <string>req.query.accountId;
    const dateStart: string = <string>req.query.dateStart;
    const dateEnd: string = <string>req.query.dateEnd;
    const transactions = await transactionsService.findTransactionAmountAverage(accountId,dateStart,dateEnd);
    res.status(200).json(transactions);
}