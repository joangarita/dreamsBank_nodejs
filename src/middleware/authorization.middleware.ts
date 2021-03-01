import {Request,Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export function authorize(req: Request, res: Response, next: NextFunction){
    try{
        const token:string = <string>req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token,<string> process.env.JWT_KEY);
        req.body.token = decoded;
        next();
    }catch(err){
        res.status(401).json();
    }
}

function authorizeGeneral(req: Request, res: Response, next: NextFunction, authorized:(req: Request)=>boolean){
    try{
        const token:string = <string>req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token,<string> process.env.JWT_KEY);
        req.body.token = decoded;
        if(!authorized(req)){
            res.status(401).json();
        }
        next();
    }catch(err){
        res.status(401).json();
    }
}

export function authorizeByAccount(req: Request, res: Response, next: NextFunction){
    authorizeGeneral(req,res,next, (req) => {
        //TODO verify userId is holder of accountId
        return true;
    });
}

export function authorizeByTransactionId(req: Request, res: Response, next: NextFunction){
    authorizeGeneral(req, res, next, (req) => {
         //TODO verify userId is holder of accountId involved in transactionId
        return true;
    });
}