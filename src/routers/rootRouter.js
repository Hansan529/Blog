import express from "express";

import { home } from "../controllers/homeControllers";
import { getLogin, postLogin } from "../controllers/adminControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;
