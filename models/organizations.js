import pool from '../database.js';

async function getAllOrganizations() {

    const result =
    await pool.query(
        'SELECT * FROM organizations'
    );

    return result.rows;
}

async function getOrganizationById(id) {

    const result =
    await pool.query(
        'SELECT * FROM organizations WHERE organization_id = $1',
        [id]
    );

    return result.rows[0];
}

export default {
    getAllOrganizations,
    getOrganizationById
};