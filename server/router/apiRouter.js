import express from "express";
import { getJoin, postJoin, postLogin } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post("/login", postLogin);
apiRouter.route("/join").get(getJoin).post(postJoin);

export default apiRouter;
