import express from "express";
import { postGithubLogin } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/github/finish", postGithubLogin);

export default userRouter;
