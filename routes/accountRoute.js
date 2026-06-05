import express from 'express';

import accountController from '../controllers/accountController.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get(
  '/login',
  accountController.buildLogin
);

router.post(
  '/login',
  accountController.loginUser
);

router.get(
  '/register',
  accountController.buildRegister
);

router.post(
  '/register',
  accountController.registerUser
);

router.get(
  '/logout',
  accountController.logoutUser
);

router.get(
  '/',
  auth.requireLogin,
  accountController.buildDashboard
);

router.get(
  '/users',
  auth.requireLogin,
  auth.requireRole('admin'),
  accountController.buildUsers
);

export default router;