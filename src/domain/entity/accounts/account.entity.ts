import {AccountStatus} from '../accounts/accountStatus.entity';
import {AccountType} from '../accounts/accountType.entity';

export class Account{
    id: string;
    type: AccountType;
    number: string;
    status: AccountStatus;
    branch: string | undefined;
    balance: number;
    constructor(
        id: string,
        type: AccountType,
        number: string,
        status: AccountStatus,
        branch?: string,
        balance: number = 0){
            this.id = id;
            this.type = type;
            this.number = number;
            this.status = status;
            this.branch = branch;
            this.balance = balance;
        };
}