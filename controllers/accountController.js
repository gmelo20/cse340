import bcrypt from 'bcrypt';

import userModel from '../models/user-model.js';

async function buildLogin(req, res) {

  const message = req.session.message || null;

  req.session.message = null;

  res.render('login', {
    title: 'Login',
    message,
    errors: []
  });

}

async function loginUser(req, res) {

  const { user_email, user_password } = req.body;

  const errors = [];

  if (!user_email || !user_password) {

    errors.push('Email and password are required.');

    return res.render('login', {
      title: 'Login',
      message: null,
      errors
    });

  }

  const user = await userModel.getUserByEmail(user_email);

  if (!user) {

    errors.push('Invalid email or password.');

    return res.render('login', {
      title: 'Login',
      message: null,
      errors
    });

  }

  const match = await bcrypt.compare(user_password, user.user_password);

  if (!match) {

    errors.push('Invalid email or password.');

    return res.render('login', {
      title: 'Login',
      message: null,
      errors
    });

  }

  req.session.user = {
    user_id: user.user_id,
    user_firstname: user.user_firstname,
    user_lastname: user.user_lastname,
    user_email: user.user_email,
    user_role: user.user_role
  };

  res.redirect('/account');

}

async function buildRegister(req, res) {

  res.render('register', {
    title: 'Register',
    errors: []
  });

}

async function registerUser(req, res) {

  const {
    user_firstname,
    user_lastname,
    user_email,
    user_password
  } = req.body;

  const errors = [];

  if (!user_firstname || !user_lastname || !user_email || !user_password) {

    errors.push('All fields are required.');

  }

  if (user_password && user_password.length < 6) {

    errors.push('Password must have at least 6 characters.');

  }

  if (errors.length > 0) {

    return res.render('register', {
      title: 'Register',
      errors
    });

  }

  try {

    const hashedPassword = await bcrypt.hash(user_password, 10);

    await userModel.createUser(
      user_firstname,
      user_lastname,
      user_email,
      hashedPassword
    );

    req.session.message = 'Account created! Please log in.';

    res.redirect('/account/login');

  } catch (error) {

    errors.push('Email already registered.');

    res.render('register', {
      title: 'Register',
      errors
    });

  }

}

async function buildDashboard(req, res) {

  res.render('dashboard', {
    title: 'Dashboard',
    user: req.session.user
  });

}

async function logoutUser(req, res) {

  req.session.destroy();

  res.redirect('/');

}

async function buildUsers(req, res) {

  const users = await userModel.getAllUsers();

  res.render('users', {
    title: 'All Users',
    users
  });

}

export default {
  buildLogin,
  loginUser,
  buildRegister,
  registerUser,
  buildDashboard,
  logoutUser,
  buildUsers
};