import express from "express";

import { getKakaoLogin, postKakaoLogin } from "../controllers/userControllers";

const oauthRouter = express.Router();

oauthRouter.get("/login/kakao", getKakaoLogin);
oauthRouter.get("/callback/kakao", postKakaoLogin);

export default oauthRouter;
