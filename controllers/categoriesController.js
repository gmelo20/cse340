import categoryModel from '../models/category-model.js';

async function buildCategories(req, res) {

  const categories =
    await categoryModel.getAllCategories();

  res.render('categories', {
    title: 'Categories',
    categories
  });

}

async function buildCategoryById(req, res) {

  const id = req.params.id;

  const category =
    await categoryModel.getCategoryById(id);

  if (!category) {

    return res.status(404).render('404', {
      title: 'Category Not Found'
    });

  }

  res.render('category-details', {
    title: category.category_name,
    category
  });

}

async function buildNewCategory(req, res) {

  res.render('new-category', {
    title: 'New Category',
    errors: []
  });

}

async function createCategory(req, res) {

  const { category_name } = req.body;

  const errors = [];

  if (!category_name) {

    errors.push(
      'Category name is required.'
    );

  }

  if (category_name && category_name.length < 3) {

    errors.push(
      'Category name must have at least 3 characters.'
    );

  }

  if (category_name && category_name.length > 100) {

    errors.push(
      'Category name must have a maximum of 100 characters.'
    );

  }

  if (errors.length > 0) {

    return res.render('new-category', {
      title: 'New Category',
      errors
    });

  }

  try {

    await categoryModel.createCategory(category_name);

    res.redirect('/categories');

  } catch (error) {

    errors.push('Category already exists.');

    res.render('new-category', {
      title: 'New Category',
      errors
    });

  }

}

async function buildEditCategory(req, res) {

  const id = req.params.id;

  const category =
    await categoryModel.getCategoryById(id);

  res.render('edit-category', {
    title: 'Edit Category',
    category,
    errors: []
  });

}

async function updateCategory(req, res) {

  const id = req.params.id;

  const { category_name } = req.body;

  const errors = [];

  if (!category_name) {

    errors.push(
      'Category name is required.'
    );

  }

  if (category_name && category_name.length < 3) {

    errors.push(
      'Category name must have at least 3 characters.'
    );

  }

  if (category_name && category_name.length > 100) {

    errors.push(
      'Category name must have a maximum of 100 characters.'
    );

  }

  if (errors.length > 0) {

    return res.render('edit-category', {
      title: 'Edit Category',
      errors,
      category: {
        category_id: id,
        category_name
      }
    });

  }

  try {

    await categoryModel.updateCategory(id, category_name);

    res.redirect('/categories');

  } catch (error) {

    errors.push('Error updating category.');

    res.render('edit-category', {
      title: 'Edit Category',
      errors,
      category: {
        category_id: id,
        category_name
      }
    });

  }

}

export default {
  buildCategories,
  buildCategoryById,
  buildNewCategory,
  createCategory,
  buildEditCategory,
  updateCategory
};