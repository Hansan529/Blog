export const home = (req, res) => {
  return res.render("home", { pageTitle: "메인 홈페이지" });
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "로그인" });
};
