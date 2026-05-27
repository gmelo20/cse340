import express from 'express';

import organizationsController
from '../controllers/organizationsController.js';

const router = express.Router();

router.get(
    '/',
    organizationsController.buildOrganizations
);

router.get(
    '/:organizationId',
    organizationsController.buildOrganizationById
);

export default router;