import Project from "../models/Project";
import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join");

export const postJoin = async (req, res) => {
  const {
    body: { id, password, email, username },
  } = req;
  try {
    await User.create({
      id,
      password,
      email,
      username,
    });
  } catch (err) {
    return res.send(err);
  }
  return res.redirect("/");
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "로그인" });
};

export const postLogin = async (req, res) => {
  const {
    body: { id, password, email, username, keepLogin },
  } = req;
  const user = await User.findOne({ id });
  const pwdCheck = user && (await bcrypt.compare(password, user.password));
  if (!pwdCheck) {
    return res.send("에러");
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getUploadProject = (req, res) => {
  return res.render("upload");
};
