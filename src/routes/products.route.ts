
import {Router} from 'express';
import { createProductRequest } from '../controllers/products.controller';
import {authorize} from '../middleware/authorization.middleware';
import { validateCreateProductrequest } from '../middleware/validators/productsValidator.middleware';
import { checkRequest } from '../middleware/validators/validateRequest.middleware';

const router = Router();

// Route to /products
router.route('/request').post(
    authorize,
    validateCreateProductrequest,
    checkRequest,
    createProductRequest);

export default router;