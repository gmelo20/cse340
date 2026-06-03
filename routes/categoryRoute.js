import express from 'express';

import categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get(
  '/categories',
  categoryController.buildCategories
);

router.get(
  '/new-category',
  categoryController.buildNewCategory
);

router.post(
  '/new-category',
  categoryController.createCategory
);

router.get(
  '/edit-category/:id',
  categoryController.buildEditCategory
);

router.post(
  '/edit-category/:id',
  categoryController.updateCategory
);

router.get(
  '/categories/:id',
  categoryController.buildCategoryById
);

export default router;