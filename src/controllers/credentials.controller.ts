import {Request, Response} from 'express';
import {connect} from '../infrastructure/database'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getCredentials(documentType:string, documentNumber:string): Promise<any>{
    const conn = await connect();
    const credentials= await conn.query('SELECT * FROM credentials WHERE user_id = (SELECT id FROM users WHERE document_type = ? AND document_number = ?)'
    ,[documentType, documentNumber]);
    return JSON.parse(JSON.stringify(credentials[0]))[0];
}

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