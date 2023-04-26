import express from "express";

import userRouter from "./userRouter";
import {
  getJoin,
  getLogin,
  home,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", logout);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/users", userRouter);

export default rootRouter;
