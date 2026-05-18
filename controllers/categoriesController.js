import categoriesModel
from '../models/categories.js';

async function buildCategories(req, res) {

  const categories =
    await categoriesModel.getAllCategories();

  res.render('categories', {
    title: 'Categories',
    categories
  });

}

async function buildCategoryById(req, res) {

  const categoryId =
    req.params.categoryId;

  const category =
    await categoriesModel.getCategoryById(
      categoryId
    );

  const projects =
    await categoriesModel.getProjectsByCategory(
      categoryId
    );

  res.render('category-details', {
    title: category.category_name,
    category,
    projects
  });

}

export default {
  buildCategories,
  buildCategoryById
};