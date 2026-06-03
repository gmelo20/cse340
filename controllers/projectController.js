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

export default {
  buildProjects,
  buildProjectById
};