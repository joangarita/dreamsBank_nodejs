import {Credential} from '../entity/users/credential.entity';
import {Document} from '../entity/users/document.entity';

export interface UsersRepository{
    findCurrentCredential(document:Document):Promise<Credential>;
}