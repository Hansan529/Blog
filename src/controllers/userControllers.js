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

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";

    const userData = await (
      await fetch(`${apiUrl}/user`, {
        Authorization: `token ${access_token}`,
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        Authorization: `token ${access_token}`,
      })
    ).json;
    /** 이메일 배열에서 primary와 verified가 모두 true 인 배열만 찾기 */
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );

    /** 만약 email이 없다면, 오류 메시지와 함께 로그인으로 이동시킴 */
    if (!emailObj) {
      return res.redirect("/login");
    }

    /* 유저 데이터베이스에 email이 primary,verified가 true인 배열과 일치하는 배열만 찾기 */
    const userAlready = await User.findOne({ email: emailObj.email });

    /* 일치하는 이메일이 있다면, login 성공 */
    if (userAlready) {
      req.session.loggedIn = true;
      req.session.user = userAlready;
      return res.redirect("/");
    } else {
      const userNameExists = await User.exists({ username: userData.login });
      const nameExists = await User.exists({ name: userData.name });
      console.log("userNameExists: ", userNameExists);
      console.log("nameExists: ", nameExists);
      let username = userData.login;
      let name = userData.name;

      /* 일치하는 아이디가 있으면 랜덤 아이디로 지정 */
      userNameExists ? (username = nanoid(10)) : username;

      /* 일치하는 닉네임이 있으면 랜덤 닉네임으로 지정 */
      nameExists ? (name = nanoid(10)) : name;

      /* 유저 생성 */
      const user = await User.create({
        name,
        avatarUrl: userData.avatar_url,
        socialLogin: true,
        username,
        email: emailObj.email,
        location: userData.location,
      });

      /* login 처리 */
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
  } else {
    /* access_token이 없을 경우 */
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
