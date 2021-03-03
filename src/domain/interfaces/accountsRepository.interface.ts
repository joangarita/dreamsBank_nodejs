import {Account} from '../entity/accounts/account.entity';

export interface AccountsRepository{
    findByUserId(userId: String):Promise<Account[]>;
}