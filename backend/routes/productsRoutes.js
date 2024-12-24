import { Router } from 'express';
import { getAllProducts, productCreationHandler } from '../controller/productsHandler.js';

const router = Router();

router.post('/products/product', productCreationHandler)
router.get('/products', getAllProducts)

export default router;