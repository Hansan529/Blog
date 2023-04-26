import express from "express";
import { getKakaoLogin } from "../controllers/userControllers";

const oauthRouter = express.Router();

oauthRouter.get("/callback/kakao", getKakaoLogin);

export default oauthRouter;
