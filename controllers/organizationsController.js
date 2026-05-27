import organizationsModel from '../models/organizations.js';

async function buildOrganizations(req, res) {

  const organizations =
    await organizationsModel.getAllOrganizations();

  res.render('organizations', {
    title: 'Organizations',
    organizations: organizations
  });

}

async function buildOrganizationById(req, res) {

  const id = req.params.id;

  const organization =
    await organizationsModel.getOrganizationById(id);

  res.render('organization-details', {
    title: organization.organization_name,
    organization: organization
  });

}

export default {
  buildOrganizations,
  buildOrganizationById
};