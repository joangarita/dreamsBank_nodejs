import {connect} from '../database';
import {AccountsRepository} from '../../domain/interfaces/accountsRepository.interface';
import {Account} from '../../domain/entity/accounts/account.entity';
import {AccountStatus} from '../../domain/entity/accounts/accountStatus.entity';
import {AccountType} from '../../domain/entity/accounts/accountType.entity';


export class AccountsDao implements AccountsRepository{
    async findByUserId(userId: String): Promise<Account[]> {
        const conn = await connect();
        //TODO change sql statme to return full values from accountStatus and accountType tables
        const accounts = await conn.query('SELECT * FROM accounts where id in (SELECT account FROM account_holding WHERE holder = ?)',[userId]);
        const parsedJson:any[] = JSON.parse(JSON.stringify(accounts[0]));
        let result:Account[] = [];
        parsedJson.forEach((value) => {
            result.push(this.accountJsonToAccount(value));
        })
        
        return result;
    }

    accountJsonToAccount(jsonValue:any):Account{
        return new Account(
            jsonValue.id,
            new AccountType(jsonValue.account_type,'---'),
            jsonValue.balance,
            new AccountStatus(jsonValue.status,'---')
            );
    }
}