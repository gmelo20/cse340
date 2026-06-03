import express from 'express';

import projectController from '../controllers/projectController.js';

const router = express.Router();

router.get(
  '/',
  projectController.buildProjects
);

router.get(
  '/:projectId',
  projectController.buildProjectById
);

export default router;