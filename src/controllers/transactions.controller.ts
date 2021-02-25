import {Request, Response} from 'express';
import {connect} from '../infrastructure/database'

export async function getAllByAccount(req: Request, res:Response){
    const accountId:string = <string>req.query.accountId;
    const conn = await connect();
    const transactions = await conn.query('SELECT * FROM transactions where origin = ? OR destination = ?',
    [accountId,accountId])
    return res.status(200).json(transactions[0]);
}

export async function getTransactionDetail(req: Request, res:Response){
    const transactionId:string = <string>req.params.id;
    const conn = await connect();
    const transactions = await conn.query('SELECT * FROM transactions where id = ?',
    [transactionId]);
    return res.status(200).json(transactions[0]);
}

export async function getAverageTransactionAmount(req: Request, res:Response){
    const accountId:string = <string>req.query.accountId;
    const conn = await connect();
    const average:any = await conn.query('SELECT AVG(amount) as avg  FROM transactions WHERE origin = ?',
    [accountId]);
    //TODO find solution to accessing data, problably use an ORM
    return res.status(201).json({average: JSON.stringify(average[0].avg)})
}