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

async function createProject(name, description) {

  await pool.query(`
    INSERT INTO projects (
      project_name,
      project_description
    )
    VALUES ($1, $2)
  `, [name, description]);

}

async function updateProject(id, name, description) {

  await pool.query(`
    UPDATE projects
    SET project_name = $1,
        project_description = $2
    WHERE project_id = $3
  `, [name, description, id]);

}

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject
};