import { Transaction } from '../../domain/entity/transactions/transaction.entity';
import { TransactionStatus } from '../../domain/entity/transactions/transactionStatus.entity';
import { TransactionsRepository } from '../../domain/interfaces/transactionsRepository.interface';
import {connect} from '../database';

export class TransactionsDao implements TransactionsRepository{

    async getAllByAccount(accountId: string): Promise<Transaction[]> {
        const conn = await connect();
        const transactions = await conn.query('SELECT * FROM transactions where origin = ? OR destination = ?',
        [accountId,accountId]);
        const parsedJson:any[] = JSON.parse(JSON.stringify(transactions[0]));
        let result: Transaction[] = [];
        parsedJson.forEach(value => {
            result.push(this.jsonToTransaction(value));
        });
        return result;
    }

    async getById(transactionId: string): Promise<Transaction> {
        const conn = await connect();
        const transactions = await conn.query('SELECT * FROM transactions where id = ?',
        [transactionId]);
        const parsedJson:any = JSON.parse(JSON.stringify(transactions[0]))[0];
        return this.jsonToTransaction(parsedJson);
    }

    async calculateAverageTransaction(accountId: string, dateStart: string, dateEnd: string): Promise<number> {
        const conn = await connect();
        const average = await conn.query(
            'Select (SELECT IFNULL(AVG(amount),0) * COUNT(*)  FROM transactions WHERE destination = ? AND date_start BETWEEN ? AND ? )-(SELECT IFNULL(AVG(amount),0) * COUNT(*)  FROM transactions WHERE origin = ? AND date_start BETWEEN ? AND ? ) AS average;',
            [accountId,dateStart,dateEnd,accountId,dateStart,dateEnd]);
    return  JSON.parse(JSON.stringify(average[0]))[0];
    }


    jsonToTransaction(json:any): Transaction{
        return new Transaction(
            json.id,
            json.origin,
            json.destination,
            json.amount,
            new TransactionStatus(json.status, '---'),
            json.t_reference,
            json.additional_info,
            json.date_start,
            json.date_finished,
            json.fee
        );
    }

}