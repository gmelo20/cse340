import pool from '../database.js';

async function getAllCategories() {

  const result = await pool.query(`
    SELECT *
    FROM categories
    ORDER BY category_name
  `);

  return result.rows;

}

async function getCategoryById(id) {

  const result = await pool.query(`
    SELECT *
    FROM categories
    WHERE category_id = $1
  `, [id]);

  return result.rows[0];

}

async function getCategoriesByProject(projectId) {

  const result = await pool.query(`
    SELECT c.*
    FROM categories c
    JOIN project_categories pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.category_name
  `, [projectId]);

  return result.rows;

}

async function createCategory(name) {

  await pool.query(`
    INSERT INTO categories (
      category_name
    )
    VALUES ($1)
  `, [name]);

}

async function updateCategory(id, name) {

  await pool.query(`
    UPDATE categories
    SET category_name = $1
    WHERE category_id = $2
  `, [name, id]);

}

export default {
  getAllCategories,
  getCategoryById,
  getCategoriesByProject,
  createCategory,
  updateCategory
};