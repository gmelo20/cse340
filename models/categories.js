import pool from '../database.js';

async function getAllCategories() {

    const data =
        await pool.query(
            'SELECT * FROM categories'
        );

    return data.rows;
}

async function getCategoryById(categoryId) {

    const data =
        await pool.query(
            'SELECT * FROM categories WHERE category_id = $1',
            [categoryId]
        );

    return data.rows[0];
}

async function getProjectsByCategory(categoryId) {

    const data = await pool.query(`
        SELECT projects.*
        FROM projects
        JOIN projects_categories
        ON projects.project_id = projects_categories.project_id
        WHERE projects_categories.category_id = $1
    `, [categoryId]);

    return data.rows;
}

export default {

    getAllCategories,

    getCategoryById,

    getProjectsByCategory,

    getCategoriesByProject

};

async function getCategoriesByProject(projectId) {

    const data = await pool.query(`
        SELECT categories.*
        FROM categories
        JOIN projects_categories
        ON categories.category_id =
        projects_categories.category_id
        WHERE projects_categories.project_id = $1
    `, [projectId]);

    return data.rows;
}