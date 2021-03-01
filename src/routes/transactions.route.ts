import {Router} from 'express';

const router = Router();
import {getAllByAccount, getTransactionDetail, getAverageAmount} from '../controllers/transactions.controller';
import {authorizeByAccount, authorizeByTransactionId} from '../middleware/authorization.middleware';
import { validateListTransactions, validateTransactionDetail, validateAverage } from '../middleware/validators/transactionsValidator.middleware';
import { checkRequest } from '../middleware/validators/validateRequest.middleware';

router.route('/average').get(
    validateAverage,
    checkRequest,
    authorizeByAccount,
    getAverageAmount);

router.route('/:id').get(
    validateTransactionDetail,
    checkRequest,
    authorizeByTransactionId,
    getTransactionDetail);

router.route('/').get(
    validateListTransactions,
    checkRequest,
    authorizeByAccount,
    getAllByAccount);

export default router;