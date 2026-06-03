import pool from '../database.js';

async function getAllProjects() {

  const result = await pool.query(`
    SELECT *
    FROM projects
    ORDER BY project_id
    LIMIT 5
  `);

  return result.rows;

}

async function getProjectById(projectId) {

  const result = await pool.query(`
    SELECT *
    FROM projects
    WHERE project_id = $1
  `, [projectId]);

  return result.rows[0];

}

export default {
  getAllProjects,
  getProjectById
};