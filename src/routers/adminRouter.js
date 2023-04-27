import express from "express";
import {
  getUploadProject,
  postUploadProject,
} from "../controllers/adminControllers";
import { getGithubLogin } from "../controllers/userControllers";
import { adminMiddleware } from "../middleware";

const adminRouter = express.Router();

adminRouter
  .route("/upload/project")
  .all(adminMiddleware)
  .get(getUploadProject)
  .post(postUploadProject);

export default adminRouter;
