import { Credential } from '../../domain/entity/users/credential.entity';
import { Document } from '../../domain/entity/users/document.entity';
import { UsersRepository } from '../../domain/interfaces/usersRepository.interface';
import {connect} from '../database';


export class UsersDao implements UsersRepository{
    async findCurrentCredential(document: Document): Promise<Credential> {
        const conn = await connect();
        //TODO Add validation of stauts
        const credentials= await conn.query('SELECT * FROM credentials WHERE user_id = (SELECT id FROM users WHERE document_type = ? AND document_number = ?)'
        ,[document.type, document.number]);
        const parsedJson = JSON.parse(JSON.stringify(credentials[0]))[0];
        return this.jsonToCredential(parsedJson);
    }

    jsonToCredential(json: any):Credential{
        return new Credential(json.id,json.user_id,json.password);
    }
}