import {Router} from 'express';

const router = Router();
import {getAllByAccount, getAverageTransactionAmount} from '../controllers/transactions.controller';
import { getTransactionDetail } from '../controllers/transactions.controller';

router.route('/').get(getAllByAccount);
router.route('/:id').get(getTransactionDetail);
router.route('/average').get(getAverageTransactionAmount);

export default router;