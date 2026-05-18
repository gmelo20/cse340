import express from 'express';

const router = express.Router();

import categoriesController
from '../controllers/categoriesController.js';

router.get(
    '/',
    categoriesController.buildCategories
);

router.get('/category/:categoryId',
    categoriesController.buildCategoryById
);

export default router;