import express from 'express';

import volunteerController from '../controllers/volunteerController.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/add/:projectId',
  auth.requireLogin,
  volunteerController.addVolunteer
);

router.post(
  '/remove/:projectId',
  auth.requireLogin,
  volunteerController.removeVolunteer
);

export default router;