import {connect} from '../infrastructure/database';

export async function findAll(userId: string):Promise<any>{
    const conn = await connect();
    const accounts = await conn.query('SELECT * FROM accounts where id in (SELECT account FROM account_holding WHERE holder = ?)',[userId]);
    return accounts[0];
}