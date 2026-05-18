import pool from '../database.js';

async function getProjectById(projectId) {

    const data = await pool.query(`
        SELECT *
        FROM projects
        WHERE project_id = $1
    `, [projectId]);

    return data.rows[0];
}

export default {
    getProjectById
};