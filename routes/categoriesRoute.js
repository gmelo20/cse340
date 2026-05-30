import express from 'express';

const router = express.Router();

import categoriesController
from '../controllers/categoriesController.js';

router.get(
  '/categories',
  categoriesController.buildCategories
);

router.get(
  '/new-category',
  categoriesController.buildNewCategory
);

router.post(
  '/new-category',
  categoriesController.createCategory
);

router.get(
  '/edit-category/:id',
  categoriesController.buildEditCategory
);

router.post(
  '/edit-category/:id',
  categoriesController.updateCategory
);

router.get(
  '/categories/:id',
  categoriesController.buildCategoryById
);

export default router;