import { UsersDao } from "../../infrastructure/dao/credentials.dao";
import { Document } from "../entity/users/document.entity";
import { UsersRepository } from "../interfaces/usersRepository.interface";
import {Credential} from '../entity/users/credential.entity';

class UsersService{
    repository: UsersRepository;
    constructor(repository: UsersRepository){
        this.repository = repository;
    }

    public async getCredentials(document: Document): Promise<Credential>{
        return this.repository.findCurrentCredential(document);
    }
}

export default new UsersService(new UsersDao);