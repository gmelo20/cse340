import pool from '../database.js';

async function getAllCategories() {

    const data = await pool.query(
        'SELECT * FROM categories'
    );

    return data.rows;
}

export default {
    getAllCategories
};