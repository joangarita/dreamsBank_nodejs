import {body} from 'express-validator';

export const validateLogin:any = [
    body('document.type')
        .notEmpty()
        .withMessage('Document type must be filled'),
    body('document.number')
        .notEmpty()
        .withMessage('Document number must be filled'),
    body('password')
        .notEmpty()
        .withMessage('Password must be filled')
];

export default [];