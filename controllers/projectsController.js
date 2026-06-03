import organizationModel from '../models/organization-model.js';

async function buildOrganizations(req, res) {

  const organizations =
    await organizationModel.getAllOrganizations();

  res.render('organizations', {
    title: 'Organizations',
    organizations
  });

}

async function buildOrganizationById(req, res) {

  const id = req.params.id;

  const organization =
    await organizationModel.getOrganizationById(id);

  if (!organization) {

    return res.status(404).render('404', {
      title: 'Organization Not Found'
    });

  }

  res.render('organization-details', {
    title: organization.organization_name,
    organization
  });

}

async function buildNewOrganization(req, res) {

  res.render('new-organization', {
    title: 'New Organization',
    errors: []
  });

}

async function createOrganization(req, res) {

  const { organization_name } = req.body;

  const errors = [];

  if (!organization_name) {

    errors.push(
      'Organization name is required.'
    );

  }

  if (organization_name && organization_name.length < 3) {

    errors.push(
      'Organization name must have at least 3 characters.'
    );

  }

  if (organization_name && organization_name.length > 100) {

    errors.push(
      'Organization name must have a maximum of 100 characters.'
    );

  }

  if (errors.length > 0) {

    return res.render('new-organization', {
      title: 'New Organization',
      errors
    });

  }

  try {

    await organizationModel.createOrganization(organization_name);

    res.redirect('/organizations');

  } catch (error) {

    errors.push('Organization already exists.');

    res.render('new-organization', {
      title: 'New Organization',
      errors
    });

  }

}

async function buildEditOrganization(req, res) {

  const id = req.params.id;

  const organization =
    await organizationModel.getOrganizationById(id);

  res.render('edit-organization', {
    title: 'Edit Organization',
    organization,
    errors: []
  });

}

async function updateOrganization(req, res) {

  const id = req.params.id;

  const { organization_name } = req.body;

  const errors = [];

  if (!organization_name) {

    errors.push(
      'Organization name is required.'
    );

  }

  if (organization_name && organization_name.length < 3) {

    errors.push(
      'Organization name must have at least 3 characters.'
    );

  }

  if (organization_name && organization_name.length > 100) {

    errors.push(
      'Organization name must have a maximum of 100 characters.'
    );

  }

  if (errors.length > 0) {

    return res.render('edit-organization', {
      title: 'Edit Organization',
      errors,
      organization: {
        organization_id: id,
        organization_name
      }
    });

  }

  try {

    await organizationModel.updateOrganization(id, organization_name);

    res.redirect('/organizations');

  } catch (error) {

    errors.push('Error updating organization.');

    res.render('edit-organization', {
      title: 'Edit Organization',
      errors,
      organization: {
        organization_id: id,
        organization_name
      }
    });

  }

}

export default {
  buildOrganizations,
  buildOrganizationById,
  buildNewOrganization,
  createOrganization,
  buildEditOrganization,
  updateOrganization
};