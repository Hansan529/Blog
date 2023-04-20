export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "로그인" });
};

export const postLogin = (req, res) => {
  const {
    body: { id, password, email, username, keepLogin },
  } = req;
  return res.redirect("/");
};

export const getUploadProject = (req, res) => {
  return res.send("asd");
};
