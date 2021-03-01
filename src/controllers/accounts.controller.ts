import {Request, Response} from 'express';
import {connect} from '../infrastructure/database'
import {Account} from '../interface/account';

export async function getAll(req: Request, res:Response){
    const conn = await connect();
    const userId: string = <string>req.body.token.userId;
    const accounts = await conn.query('SELECT * FROM accounts where id in (SELECT account FROM account_holding WHERE holder = ?)',[userId]) ;
    return res.status(200).json(accounts[0]);
}