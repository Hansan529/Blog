export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "hxn Web Developer Blog";
  res.locals.user = req.session.user;
  res.locals.loggedInUser = req.session.loggedIn || false;
  res.locals.admin = req.session.admin || false;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }
  return res.redirect("/login");
};

export const publicMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  }
  return res.redirect("/");
};
