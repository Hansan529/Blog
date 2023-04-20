import express from "express";

import { getLogin, home } from "../controllers/homeControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").get(getLogin);

export default rootRouter;
