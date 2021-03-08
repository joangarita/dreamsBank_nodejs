import { TransactionsDao } from '../../infrastructure/dao/transactions.dao';
import {TransactionsRepository} from '../interfaces/transactionsRepository.interface';

class TransactionsService{
    repository:TransactionsRepository;
    constructor(repository:TransactionsRepository){
        this.repository = repository;
    }
    public async listAllByAccount(accountId: string){
        return this.repository.getAllByAccount(accountId);
    }
    public async getTransaction(transactionId: string){
        return this.repository.getById(transactionId);
    }
    public async findTransactionAmountAverage(accountId: string, dateStart: string, dateEnd:string){
        return this.repository.calculateAverageTransaction(accountId,dateStart, dateEnd);
    }
}

export default new TransactionsService(new TransactionsDao);