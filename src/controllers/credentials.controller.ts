import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usersService from '../domain/services/usersService';
import { Document } from '../domain/entity/users/document.entity';

export async function validateCredentials(req: Request, res:Response):Promise<void>{
    usersService.getCredentials(new Document(req.body.document.type,req.body.document.number)).then((credentials)=>{
        bcrypt.compare(req.body.password, credentials.password)
        .then(result => {
            if(result){
                const token: string = getJwtToken({userId: credentials.userId});
                res.status(200).json({msg: 'success', token});
            }
            else{
                res.status(401).json({msg: 'Unauthorized'})
            }
        })
        .catch(err => res.status(401).json({msg: 'Auth failed', err: err}));
    })
    .catch(err => {
        res.status(401).json({error: err});
    });
}

function getJwtToken(payload: object):string{
    return jwt.sign(
        payload,
        <string>process.env.JWT_KEY,
        {expiresIn: '1h'});
}