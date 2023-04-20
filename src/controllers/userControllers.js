import User from "../models/User";
import Project from "../models/Project";
import bcrypt from "bcrypt";

export const home = async (req, res) => {
  const projects = await Project.find({}).sort({ date: "desc" });
  return res.render("home", { pageTitle: "메인 홈페이지", projects });
};

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

export const getGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const connectUrl = `${baseUrl}?${params}`;
  return res.redirect(connectUrl);
};

export const postGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };

  const params = new URLSearchParams(config).toString();
  const connectUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(connectUrl, {
      method: "POST",
      headers: {
        Accept: application / json,
      },
    })
  ).json();
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
