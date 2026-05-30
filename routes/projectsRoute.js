import express from 'express';

const router =
express.Router();

import projectsController
from '../controllers/projectsController.js';

router.get(
    '/',
    projectsController.buildProjects
);

router.get(
    '/:projectId',
    projectsController.buildProjectById
);

export default router;