function requireLogin(req, res, next) {

  if (!req.session || !req.session.user) {

    req.session.message = 'You must be logged in to access that page.';

    return res.redirect('/account/login');

  }

  next();

}

function requireRole(role) {

  return function (req, res, next) {

    if (!req.session || !req.session.user) {

      req.session.message = 'You must be logged in to access that page.';

      return res.redirect('/account/login');

    }

    if (req.session.user.user_role !== role) {

      req.session.message = 'You do not have permission to access that page.';

      return res.redirect('/account');

    }

    next();

  };

}

export default {
  requireLogin,
  requireRole
};