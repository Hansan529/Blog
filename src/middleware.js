export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "hxn Web Developer Blog";
  res.locals.user = req.session.user;
  res.locals.loggedInUser = req.session.loggedIn;
  next();
};
