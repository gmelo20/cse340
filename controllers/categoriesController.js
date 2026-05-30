import categoriesModel from '../models/categories.js';

async function buildCategories(req, res) {

  const categories =
    await categoriesModel.getAllCategories();

  res.render('categories', {
    title: 'Categories',
    categories
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

  if (category_name.length < 3) {

    errors.push(
      'Category name must have at least 3 characters.'
    );

  }

  if (category_name.length > 100) {

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

    await categoriesModel.createCategory(
      category_name
    );

    res.redirect('/categories');

  } catch (error) {

    errors.push(
      'Category already exists.'
    );

    res.render('new-category', {
      title: 'New Category',
      errors
    });

  }

}

async function buildEditCategory(req, res) {

  const id = req.params.id;

  const category =
    await categoriesModel.getCategoryById(id);

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

  if (category_name.length < 3) {

    errors.push(
      'Category name must have at least 3 characters.'
    );

  }

  if (category_name.length > 100) {

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

    await categoriesModel.updateCategory(
      id,
      category_name
    );

    res.redirect('/categories');

  } catch (error) {

    errors.push(
      'Error updating category.'
    );

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

async function buildCategoryById(req, res) {

  const id = req.params.id;

  const category =
    await categoriesModel.getCategoryById(id);

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

export default {
  buildCategories,
  buildCategoryById,
  buildNewCategory,
  createCategory,
  buildEditCategory,
  updateCategory
};