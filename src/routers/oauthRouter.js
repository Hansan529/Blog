import express from "express";

import {
  getGithubLogin,
  getKakaoLogin,
  postKakaoLogin,
} from "../controllers/userControllers";

const oauthRouter = express.Router();

oauthRouter.get("/login/github", getGithubLogin);
oauthRouter.get("/login/kakao", getKakaoLogin);
oauthRouter.get("/callback/kakao", postKakaoLogin);

export default oauthRouter;
