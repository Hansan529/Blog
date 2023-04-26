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
export default userRouter;
