import express from 'express';

const router =
express.Router();

import projectsController
from '../controllers/projectsController.js';

router.get(
    '/:projectId',
    projectsController.buildProjectById
);

export default router;