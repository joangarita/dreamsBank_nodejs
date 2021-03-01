import {Router} from 'express';
import { validateCredentials} from '../controllers/credentials.controller';
import {checkRequest} from '../middleware/validators/validateRequest.middleware'
import { validateLogin } from '../middleware/validators/userValidator.middleware';

const router = Router();


router.post('/login',
    validateLogin,
    checkRequest,
    validateCredentials
    );
export default router;