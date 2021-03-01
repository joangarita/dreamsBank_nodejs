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