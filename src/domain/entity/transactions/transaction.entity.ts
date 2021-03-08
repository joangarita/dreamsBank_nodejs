import { TransactionStatus } from "./transactionStatus.entity";

export class Transaction{
    id: string;
    origin: string;
    destination: string;
    amount: number;
    status: TransactionStatus;
    reference: string;
    additionalInfo: string;
    dateStart: string;
    dateFinish: string;
    fee: number;
    constructor(
        id: string,
        origin: string,
        destination: string,
        amount: number,
        status: TransactionStatus,
        reference: string,
        additionalInfo: string,
        dateStart: string,
        dateFinish: string,
        fee: number){
            this.id = id;
            this.origin = origin;
            this.destination = destination;
            this.amount = amount;
            this.status = status;
            this.reference = reference;
            this.additionalInfo = additionalInfo;
            this.dateStart = dateStart;
            this.dateFinish = dateFinish;
            this.fee = fee;
    }
}