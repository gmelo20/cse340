import projectsModel
from '../models/projects.js';

import categoriesModel
from '../models/categories.js';

async function buildProjectById(req, res) {

    const projectId =
        req.params.projectId;

    const project =
        await projectsModel.getProjectById(
            projectId
        );

    const categories =
        await categoriesModel.getCategoriesByProject(
            projectId
        );

    res.render('project-details', {

        title: project.project_name,

        project,

        categories

    });
}

export default {
    buildProjectById
};