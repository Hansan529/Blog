import express from "express";
import {
  getGithubLogin,
  getKakaoLogin,
  postGithubLogin,
  postKakaoLogin,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/login/github", getGithubLogin);
userRouter.get("/github/finish", postGithubLogin);
userRouter.get("/login/kakao", getKakaoLogin);
userRouter.get("/kakao/callback", postKakaoLogin);
export default userRouter;
