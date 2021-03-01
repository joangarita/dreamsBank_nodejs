import {connect} from '../infrastructure/database';

export async function findAllByAccount(accountId: string){
    const conn = await connect();
    const transactions = await conn.query('SELECT * FROM transactions where origin = ? OR destination = ?',
    [accountId,accountId]);
    return transactions[0];
}

export async function findById(transactionId: string){
    const conn = await connect();
    const transactions = await conn.query('SELECT * FROM transactions where id = ?',
    [transactionId]);
    return transactions[0];
}

export async function findAverage(accountId: string, dateStart: string, dateEnd:string){
    const conn = await connect();
    const average = await conn.query(
        'Select (SELECT IFNULL(AVG(amount),0) * COUNT(*)  FROM transactions WHERE destination = ? AND date_start BETWEEN ? AND ? )-(SELECT IFNULL(AVG(amount),0) * COUNT(*)  FROM transactions WHERE origin = ? AND date_start BETWEEN ? AND ? ) AS average;',
        [accountId,dateStart,dateEnd,accountId,dateStart,dateEnd]);
    // return average[0];
    return  JSON.parse(JSON.stringify(average[0]))[0];
}