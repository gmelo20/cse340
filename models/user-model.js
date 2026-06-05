import pool from '../database.js';

async function getUserByEmail(email) {

  const result = await pool.query(`
    SELECT *
    FROM users
    WHERE user_email = $1
  `, [email]);

  return result.rows[0];

}

async function createUser(firstname, lastname, email, hashedPassword) {

  await pool.query(`
    INSERT INTO users (
      user_firstname,
      user_lastname,
      user_email,
      user_password
    )
    VALUES ($1, $2, $3, $4)
  `, [firstname, lastname, email, hashedPassword]);

}

async function getAllUsers() {

  const result = await pool.query(`
    SELECT
      user_id,
      user_firstname,
      user_lastname,
      user_email,
      user_role
    FROM users
    ORDER BY user_lastname
  `);

  return result.rows;

}

export default {
  getUserByEmail,
  createUser,
  getAllUsers
};