import {query, param} from 'express-validator';

export const validateListTransactions = [
    query('accountId')
    .notEmpty()
    .withMessage('AccountId query param must be filled')
];

export const validateTransactionDetail = [
    param('id')
    .notEmpty()
    .withMessage('Id param must be filled')
];

export const validateAverage = [
    query('accountId')
    .notEmpty()
    .withMessage('AccountId query param must be filled'),
    query('dateStart')
    .notEmpty()
    .withMessage('dateStart query param must be filled'),
    query('dateEnd')
    .notEmpty()
    .withMessage('dateEnd query param must be filled')
];

export default [];