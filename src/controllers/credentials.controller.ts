import {Request, Response} from 'express';
import {connect} from '../infrastructure/database'
import bcrypt from 'bcrypt';

async function getHashedPassword(documentType:string, documentNumber:string){
    const conn = await connect();
    const credentials= await conn.query('SELECT password FROM credentials WHERE user_id = (SELECT id FROM users WHERE document_type = ? AND document_number = ?)'
    ,[documentType, documentNumber]);
    return JSON.parse(JSON.stringify(credentials[0]))[0].password;
}

export async function validateCredentials(req: Request, res:Response){
    getHashedPassword(req.body.document.type,req.body.document.number).then((hash)=>{
        bcrypt.compare(req.body.password, hash, function(err, result) {
            if(err){
                return res.status(401).json({
                    msg: 'Auth failed'
                });
            }
            if(result){
                //TODO add logic to return json web token
                return res.status(200).json({msg: 'success'});
            }
            return res.status(401).json({msg: 'Unauthorized'})
        });
    })
    .catch(err => {
        res.send(500).json({error: err});
    });
}