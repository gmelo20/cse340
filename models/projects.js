import pool from '../database.js';

async function getAllProjects() {

    const data = await pool.query(`
        SELECT *
        FROM projects
        ORDER BY project_id
        LIMIT 5
    `);

    return data.rows;
}

async function getProjectById(projectId) {

    const data = await pool.query(`
        SELECT *
        FROM projects
        WHERE project_id = $1
    `, [projectId]);

    return data.rows[0];
}

export default {
    getAllProjects,
    getProjectById
};