import projectModel from '../models/project-model.js';

import categoryModel from '../models/category-model.js';

async function buildProjects(req, res) {

  const projects =
    await projectModel.getAllProjects();

  res.render('projects', {
    title: 'Projects',
    projects
  });

}

async function buildProjectById(req, res) {

  const projectId = req.params.projectId;

  const project =
    await projectModel.getProjectById(projectId);

  if (!project) {

    return res.status(404).render('404', {
      title: 'Project Not Found'
    });

  }

  const categories =
    await categoryModel.getCategoriesByProject(projectId);

  res.render('project-details', {
    title: project.project_name,
    project,
    categories
  });

}

async function buildNewProject(req, res) {

  res.render('new-project', {
    title: 'New Project',
    errors: []
  });

}

async function createProject(req, res) {

  const { project_name, project_description } = req.body;

  const errors = [];

  if (!project_name) {

    errors.push('Project name is required.');

  }

  if (project_name && project_name.length < 3) {

    errors.push('Project name must have at least 3 characters.');

  }

  if (project_name && project_name.length > 100) {

    errors.push('Project name must have a maximum of 100 characters.');

  }

  if (errors.length > 0) {

    return res.render('new-project', {
      title: 'New Project',
      errors,
      project_name,
      project_description
    });

  }

  try {

    await projectModel.createProject(project_name, project_description);

    res.redirect('/projects');

  } catch (error) {

    errors.push('Error creating project.');

    res.render('new-project', {
      title: 'New Project',
      errors,
      project_name,
      project_description
    });

  }

}

async function buildEditProject(req, res) {

  const projectId = req.params.projectId;

  const project =
    await projectModel.getProjectById(projectId);

  if (!project) {

    return res.status(404).render('404', {
      title: 'Project Not Found'
    });

  }

  res.render('edit-project', {
    title: 'Edit Project',
    project,
    errors: []
  });

}

async function updateProject(req, res) {

  const projectId = req.params.projectId;

  const { project_name, project_description } = req.body;

  const errors = [];

  if (!project_name) {

    errors.push('Project name is required.');

  }

  if (project_name && project_name.length < 3) {

    errors.push('Project name must have at least 3 characters.');

  }

  if (project_name && project_name.length > 100) {

    errors.push('Project name must have a maximum of 100 characters.');

  }

  if (errors.length > 0) {

    return res.render('edit-project', {
      title: 'Edit Project',
      errors,
      project: {
        project_id: projectId,
        project_name,
        project_description
      }
    });

  }

  try {

    await projectModel.updateProject(projectId, project_name, project_description);

    res.redirect('/projects');

  } catch (error) {

    errors.push('Error updating project.');

    res.render('edit-project', {
      title: 'Edit Project',
      errors,
      project: {
        project_id: projectId,
        project_name,
        project_description
      }
    });

  }

}

export default {
  buildProjects,
  buildProjectById,
  buildNewProject,
  createProject,
  buildEditProject,
  updateProject
};