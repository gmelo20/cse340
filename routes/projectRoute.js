import express from 'express';

import projectController from '../controllers/projectController.js';

const router = express.Router();

router.get(
  '/',
  projectController.buildProjects
);

router.get(
  '/new-project',
  projectController.buildNewProject
);

router.post(
  '/new-project',
  projectController.createProject
);

router.get(
  '/edit-project/:projectId',
  projectController.buildEditProject
);

router.post(
  '/edit-project/:projectId',
  projectController.updateProject
);

router.get(
  '/:projectId',
  projectController.buildProjectById
);

export default router;