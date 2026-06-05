import bcrypt from 'bcrypt';
import pool from './database.js';

const password = 'cse340!';
const hash = await bcrypt.hash(password, 10);

await pool.query(`
  INSERT INTO users (
    user_firstname,
    user_lastname,
    user_email,
    user_password,
    user_role
  )
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (user_email) DO UPDATE
  SET user_password = $4,
      user_role = $5
`, ['Admin', 'User', 'admin@example.com', hash, 'admin']);

console.log('Admin criado com sucesso!');
process.exit(0);