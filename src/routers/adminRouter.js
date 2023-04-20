import express from "express";
import {
  getUploadProject,
  postUploadProject,
} from "../controllers/adminControllers";
import { getGithubLogin } from "../controllers/userControllers";

const adminRouter = express.Router();

adminRouter
  .route("/upload/project")
  .get(getUploadProject)
  .post(postUploadProject);

adminRouter.get("/login/github", getGithubLogin);

export default adminRouter;
