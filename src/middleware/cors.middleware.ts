import express from 'express';
const cors = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.header("Allow-Control-Allow-Origin", "*"); //maybe restrict to only client domain if necessary
    res.header("Access-Control-Allow-headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
}

export default cors;