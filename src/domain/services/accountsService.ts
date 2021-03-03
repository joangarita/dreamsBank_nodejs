import { AccountsDao } from "../../infrastructure/dao/accounts.dao";
import {AccountsRepository} from '../interfaces/accountsRepository.interface';
import {Account} from '../entity/accounts/account.entity';

class AccountsService {
    repository: AccountsRepository;

    constructor(repository:AccountsRepository){
        this.repository = repository;
    }

    public async listAccounts(userId: string):Promise<Account[]>{
        return this.repository.findByUserId(userId);
    }
}

export default new AccountsService(new AccountsDao);