import moment from 'moment';
import express from 'express';


const logger = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    console.log(`${moment().format()} >> ${req.method} request received at ${req.url}`);
    next();
}

export default logger;