import pool from '../database.js';

async function getAllOrganizations() {

  const result = await pool.query(`
    SELECT *
    FROM organizations
    ORDER BY organization_name
  `);

  return result.rows;

}

async function getOrganizationById(id) {

  const result = await pool.query(`
    SELECT *
    FROM organizations
    WHERE organization_id = $1
  `, [id]);

  return result.rows[0];

}

async function createOrganization(name) {

  await pool.query(`
    INSERT INTO organizations (
      organization_name
    )
    VALUES ($1)
  `, [name]);

}

async function updateOrganization(id, name) {

  await pool.query(`
    UPDATE organizations
    SET organization_name = $1
    WHERE organization_id = $2
  `, [name, id]);

}

export default {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization
};