import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {getCredentials} from '../infrastructure/dao/credentials.dao';

export async function validateCredentials(req: Request, res:Response):Promise<void>{
    getCredentials(req.body.document.type,req.body.document.number).then((credentials)=>{
        bcrypt.compare(req.body.password, credentials.password)
        .then(result => {
            if(result){
                const token: string = getJwtToken({userId: credentials.user_id});
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