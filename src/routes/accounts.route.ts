import {Router} from 'express';
import {authorize} from '../middleware/authorization.middleware';

const router = Router();

import {getAll} from '../controllers/accounts.controller';

router.route('/').get(authorize,getAll);


export default router;