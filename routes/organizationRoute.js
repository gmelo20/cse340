import express from 'express';

import organizationController from '../controllers/organizationController.js';

const router = express.Router();

router.get(
  '/',
  organizationController.buildOrganizations
);

router.get(
  '/new-organization',
  organizationController.buildNewOrganization
);

router.post(
  '/new-organization',
  organizationController.createOrganization
);

router.get(
  '/edit-organization/:id',
  organizationController.buildEditOrganization
);

router.post(
  '/edit-organization/:id',
  organizationController.updateOrganization
);

router.get(
  '/:id',
  organizationController.buildOrganizationById
);

export default router;