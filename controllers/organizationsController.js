import organizationsModel
from '../models/organizations.js';

async function buildOrganizations(req, res) {

    const organizations =
    await organizationsModel.getAllOrganizations();

    res.render('organizations', {
        title: 'Organizations',
        organizations
    });
}

async function buildOrganizationById(req, res) {

    const organization =
    await organizationsModel.getOrganizationById(
        req.params.organizationId
    );

    res.render('organization-details', {
        title: organization.organization_name,
        organization
    });
}

export default {
    buildOrganizations,
    buildOrganizationById
};