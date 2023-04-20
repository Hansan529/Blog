export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "hxn Web Developer Blog";
  res.locals.user = req.session.user;
  next();
};
