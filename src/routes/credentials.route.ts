import {Router} from 'express';
import { validateCredentials} from '../controllers/credentials.controller';

const router = Router();

router.route('/login').post(validateCredentials);

export default router;