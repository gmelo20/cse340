import pool from '../database.js';

async function addVolunteer(userId, projectId) {

  await pool.query(`
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `, [userId, projectId]);

}

async function removeVolunteer(userId, projectId) {

  await pool.query(`
    DELETE FROM volunteers
    WHERE user_id = $1
    AND project_id = $2
  `, [userId, projectId]);

}

async function isVolunteer(userId, projectId) {

  const result = await pool.query(`
    SELECT 1
    FROM volunteers
    WHERE user_id = $1
    AND project_id = $2
  `, [userId, projectId]);

  return result.rows.length > 0;

}

async function getProjectsByVolunteer(userId) {

  const result = await pool.query(`
    SELECT p.*
    FROM projects p
    JOIN volunteers v
      ON p.project_id = v.project_id
    WHERE v.user_id = $1
    ORDER BY p.project_name
  `, [userId]);

  return result.rows;

}

export default {
  addVolunteer,
  removeVolunteer,
  isVolunteer,
  getProjectsByVolunteer
};