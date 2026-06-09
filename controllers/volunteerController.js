import volunteerModel from '../models/volunteer-model.js';

async function addVolunteer(req, res) {

  const projectId = req.params.projectId;

  const userId = req.session.user.user_id;

  await volunteerModel.addVolunteer(userId, projectId);

  res.redirect(`/projects/${projectId}`);

}

async function removeVolunteer(req, res) {

  const projectId = req.params.projectId;

  const userId = req.session.user.user_id;

  await volunteerModel.removeVolunteer(userId, projectId);

  const from = req.query.from || 'project';

  if (from === 'dashboard') {

    res.redirect('/account');

  } else {

    res.redirect(`/projects/${projectId}`);

  }

}

export default {
  addVolunteer,
  removeVolunteer
};