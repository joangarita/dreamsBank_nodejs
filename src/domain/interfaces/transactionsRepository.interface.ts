import { Transaction } from "../entity/transactions/transaction.entity";

export interface TransactionsRepository {
    getAllByAccount(accountId: string): Promise<Transaction[]>;
    getById(transactionId: string):Promise<Transaction>;
    calculateAverageTransaction(accountId: string, dateStart: string, dateEnd:string):Promise<number>;
}