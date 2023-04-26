import express from "express";

import {
  getJoin,
  getLogin,
  home,
  logout,
  postGithubLogin,
  postJoin,
  postKakaoLogin,
  postLogin,
} from "../controllers/userControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", logout);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/users/github/finish", postGithubLogin);
rootRouter.get("/users/kakao/callback", postKakaoLogin);

export default rootRouter;
