import {body} from 'express-validator';

export const validateCreateProductrequest = [
    body('productId')
    .notEmpty()
    .withMessage('productId must be filled')
]

export default [];