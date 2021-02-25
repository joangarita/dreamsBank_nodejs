import {Router} from 'express';

const router = Router();

import {getAll} from '../controllers/accounts.controller';

router.route('/').get(getAll);


export default router;