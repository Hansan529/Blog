import express from "express";

import { getLogin, home, postLogin } from "../controllers/homeControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;
